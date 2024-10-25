import { Button, Input } from "reactstrap"
import { DateTime } from 'luxon'
import { convertToTitleCase } from "@/utils/utils"
import data from '@/data/wilayah.json'
import { Wilayah } from '@/types'

const provinces = data as Wilayah[]

export default function useDashboardColumnDefinition(
  downloadBukti, 
  setDataViewerProps,
  update,
  setDeleteConfirmationProps,
  remove,
  displayedColumns,
) { 
  const definitions = [
    {
      id: 'nomor',
      name: 'No',
      omit: !displayedColumns.includes('nomor'),
      selector: (row, index) => index + 1,
      sortable: false,
      width: '60px',
    },
    {
      id: 'nama_lengkap',
      name: 'Nama',
      omit: !displayedColumns.includes('nama_lengkap'),
      selector: row => row.nama_lengkap,
      sortable: true,
      width: '300px'
    },
    {
      id: 'nik',
      name: 'NIK',
      omit: !displayedColumns.includes('nik'),
      selector: row => row.nik,
      sortable: true,
      width: '150px'
    },
    {
      id: 'provinsi',
      name: 'Provinsi',
      omit: !displayedColumns.includes('provinsi'),
      selector: row => row.provinsi,
      sortable: true,
      width: '200px'
    },
    {
      id: 'jenjang',
      name: 'Jenjang',
      omit: !displayedColumns.includes('jenjang'),
      format: row => row.jenjang?.toUpperCase(),
      selector: row => row.jenjang,
      sortable: true,
      width: '110px'
    },
    {
      id: 'jalur_pendaftaran',
      name: 'Jalur',
      omit: !displayedColumns.includes('jalur_pendaftaran'),
      selector: row => convertToTitleCase(row.jalur_pendaftaran),
      sortable: true,
      width: '100px'
    },
    {
      id: 'created_at',
      name: 'Tanggal',
      omit: !displayedColumns.includes('created_at'),
      format: row => DateTime.fromISO(row.created_at).toLocaleString(DateTime.DATE_SHORT),
      selector: row => row.created_at,
      sortable: true,
      width: '150px'
    },
    {
      id: 'pembayaran_diterima',
      name: 'Reg',
      omit: !displayedColumns.includes('pembayaran_diterima'),
      cell: row => <Input
        type="checkbox" 
        checked={row.pembayaran_diterima} 
        onChange={e => {
          update(row.id, {pembayaran_diterima: e.target.checked})
        }}
      />
    },
    {
      id: 'actions',
      name: 'Aksi',
      omit: !displayedColumns.includes('actions'),
      cell: row => (
        <>
          <Button className="me-1" color="outline-success" onClick={() => {
            setDataViewerProps({
              isOpen: true,
              registration: row,
            })  
          }}>
            Ubah
          </Button>
          {row.deleted_at ? (
            <Button color="outline-success" onClick={() => update(row.id, {deleted_at: null})}>
              <i className="bi bi-recycle"></i>
            </Button>
          ) : (
            <Button color="outline-danger" onClick={() => setDeleteConfirmationProps({
              isOpen: true,
              onConfirm: () => remove(row.id),
            })}>
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </>
      ),
      width: '150px'
    }
  ];  

  return {
    definitions
  }
}