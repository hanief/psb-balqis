import DataTable from "react-data-table-component"
import { useRegistrations } from "@/model/registration"
import { Button, Input } from "reactstrap";

const columns = [
  {
    name: 'Nama',
    selector: row => row.nama_lengkap,
    sortable: true,
  },
  {
    name: 'Tempat Lahir',
    selector: row => row.tempat_lahir,
    sortable: true,
  },
  {
    name: 'Konfirmasi Pembayaran',
    cell: row => {
      return (
        <Input type="checkbox"/>
      )
    }
  },
  {
    name: 'Nilai Tahsin',
    cell: row => {
      return (
        <Input type="text"/>
      )
    }
  },
  {
    name: 'Nilai Akademik',
    cell: row => {
      return (
        <Input type="text"/>
      )
    }
  },
  {
    name: 'Nilai Pesantren',
    cell: row => {
      return (
        <Input type="text"/>
      )
    }
  },
  {
    name: 'Status',
    width: '200px',
    cell: row => {
      return (
        <Input type="select">
          <option value="pending">Pending</option>
          <option value="accepted">Diterima</option>
          <option value="rejected">Ditolak</option>
        </Input>
      )
    }
  },
  {
    name: 'Syarat penerimaan',
    width: '200px',
    cell: row => {
      return (
        <Input type="text"/>
      )
    }
  },
  {
    name: 'Catatan Khusus',
    width: '200px',
    cell: row => {
      return (
        <Input type="text"/>
      )
    }
  },
  {
    name: 'Action',
    width: '300px',
    cell: row => {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Lihat</button>
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger">Hapus</button>
        </div>
      )
    }
  },
];

export default function Dashboard() {
  const { registrations } = useRegistrations()
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-2">
        <h3 className="w-25">Data Pendaftar</h3>
        <Button color="primary" className="me-1 w-25">Download xlsx</Button>
        <Input type="text" placeholder="Cari"/>
      </div>
      <DataTable
          columns={columns}
          data={registrations}
      />
    </div>
  )
}