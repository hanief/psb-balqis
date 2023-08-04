import DataTable from "react-data-table-component"
import { useRegistree } from "@/model/registree"
import { Input } from "reactstrap";

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
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
    name: 'Status',
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
    name: 'Action',
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
  const { registree } = useRegistree()
  return (
    <div className="container">
      <h1>Data Pendaftar</h1>
      <DataTable
          columns={columns}
          data={registree}
      />
    </div>
  )
}