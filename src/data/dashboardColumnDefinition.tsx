import { Button, Input } from "reactstrap";
import { DateTime } from 'luxon'
import { convertToTitleCase } from "@/utils/utils";

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
      minWidth: '100px',
    },
    {
      id: 'nik',
      name: 'NIK',
      omit: !displayedColumns.includes('nik'),
      selector: row => row.nik,
      sortable: true,
      minWidth: '400px',
    },
    {
      id: 'nik',
      name: 'NIK',
      omit: !displayedColumns.includes('nik'),
      selector: row => row.nik,
      sortable: true,
      minWidth: '400px',
    },
    {
      id: 'jenjang',
      name: 'Jenjang',
      omit: !displayedColumns.includes('jenjang'),
      format: row => row.jenjang?.toUpperCase(),
      selector: row => row.jenjang,
      sortable: true
    },
    {
      id: 'jalur_pendaftaran',
      name: 'Jalur',
      omit: !displayedColumns.includes('jalur_pendaftaran'),
      selector: row => convertToTitleCase(row.jalur_pendaftaran),
      sortable: true,
    },
    {
      id: 'created_at',
      name: 'Tanggal',
      omit: !displayedColumns.includes('created_at'),
      format: row => DateTime.fromISO(row.created_at).toLocaleString(DateTime.DATE_SHORT),
      selector: row => row.created_at,
      sortable: true,
      minWidth: '100px'
    },
    {
      id: 'bukti_pembayaran',
      name: 'Bukti',
      omit: !displayedColumns.includes('pembayaran_diterima'),
      cell: row => {
        if (!row.bukti_pembayaran) return '-'

        return (
          <Button color="outline-success" onClick={() => downloadBukti(row)}>
            <i className="bi bi-download"></i>
          </Button>
        )
      }
    },
    {
      id: 'pembayaran_diterima',
      name: 'Konfirmasi',
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
      minWidth: '150px',
    }
  ];  

  return {
    definitions
  }
}