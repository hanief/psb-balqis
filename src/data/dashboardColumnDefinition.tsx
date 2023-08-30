import { Button, Input } from "reactstrap";
import { DateTime } from 'luxon'

export default function useDashboardColumnDefinition(
  downloadBukti, 
  setDataViewerProps,
  update,
  setDeleteConfirmationProps,
  remove
) { 
  const definitions = [
    {
      id: 'nomor',
      name: 'No.',
      selector: (row, index) => index + 1,
      sortable: false,
      minWidth: '30px',
    },
    {
      id: 'nama_lengkap',
      name: 'Nama',
      selector: row => row.nama_lengkap,
      sortable: true,
      minWidth: '200px',
    },
    {
      id: 'jenjang',
      name: 'Jenjang',
      // hide: 'sm',
      format: row => row.jenjang?.toUpperCase(),
      selector: row => row.jenjang,
      sortable: true
    },
    {
      id: 'jalur_pendaftaran',
      name: 'Jalur',
      // hide: 'sm',
      selector: row => row.jalur_pendaftaran,
      sortable: true,
    },
    {
      id: 'created_at',
      name: 'Tanggal',
      // hide: 'sm',
      format: row => DateTime.fromISO(row.created_at).toLocaleString(DateTime.DATETIME_MED),
      selector: row => row.created_at,
      sortable: true,
    },
    {
      id: 'bukti_pembayaran',
      name: 'Bukti Pembayaran',
      cell: row => {
        if (!row.bukti_pembayaran) return '-'

        return (
          <Button color="outline-success" onClick={() => downloadBukti(row)}>
            Unduh
          </Button>
        )
      }
    },
    {
      id: 'pembayaran_diterima',
      name: 'Konfirmasi Pembayaran',
      cell: row => <Input
        type="checkbox" 
        checked={row.pembayaran_diterima} 
        onChange={e => {
          update(row.user_id, {pembayaran_diterima: e.target.checked})
        }}
      />
    },
    {
      id: 'view_data',
      name: 'Actions',
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
            <Button color="outline-success" onClick={() => update(row.user_id, {deleted_at: null})}>
              <i className="bi bi-recycle"></i>
            </Button>
          ) : (
            <Button color="outline-danger" onClick={() => setDeleteConfirmationProps({
              isOpen: true,
              onConfirm: () => remove(row.user_id),
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