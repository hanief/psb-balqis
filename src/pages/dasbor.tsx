import DataTable from "react-data-table-component"
import { useRegistrations } from "@/model/registration"
import { Button, Card, CardBody, Col, Input, InputGroup, Row } from "reactstrap";
import { useState } from "react";

export default function Dashboard() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const { registrations, getAsCSV, downloadFile } = useRegistrations({keyword})
  
  const columns = [
  {
    id: 'number',
    name: 'No',
    selector: (row, index) => index + 1,
    sortable: false,
  },
  {
    id: 'nama_lengkap',
    name: 'Nama',
    selector: row => row.nama_lengkap,
    sortable: true,
  },
  {
    id: 'tanggal_lahir',
    name: 'Tanggal Lahir',
    selector: row => row.tanggal_lahir,
    sortable: true,
  },
  {
    id: 'nama_ayah',
    name: 'Nama Ayah / Wali 1',
    selector: row => row.nama_ayah,
    sortable: true,
  },
  {
    id: 'nomor_hp_ayah',
    name: 'HP Ayah / Wali 1',
    selector: row => row.nomor_hp_ayah,
    sortable: true,
  },
  {
    id: 'nama_ibu',
    name: 'Nama Ibu / Wali 2',
    selector: row => row.nama_ibu,
    sortable: true,
  },
  {
    id: 'nomor_hp_ibu',
    name: 'HP Ibu / Wali 2',
    selector: row => row.nomor_hp_ibu,
    sortable: true,
  },
  {
    id: 'bukti_pembayaran',
    name: 'Bukti Pembayaran',
    cell: row => {
      if (!row.bukti_pembayaran) return '-'
      return (
        <Button color="primary" onClick={() => downloadFile(row.bukti_pembayaran)}>
          <i className="bi-download me-1"></i>Download
        </Button>
      )
    }
  },
];

const customStyles = {
  head: {
    style: {
      fontWeight: 'bold',
      fontSize: '1em',
    },
  },
  rows: {
    style: {
      fontSize: '1em'
    },
  },
};


  return (
    <div className="container">
      <Row>
        <Col>
        </Col>
        <Col>
          <div className="d-flex">
            <Button
              color="primary"
              className="me-1 w-50"
              onClick={() => getAsCSV()}
            >
              <i className="bi-download me-1"></i>Download
            </Button>
            <InputGroup>
              <Input
                type="text" 
                placeholder="Cari Nama" 
                value={searchKeyword} 
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyUp={e => {
                  if (e.key === 'Enter') {
                    setKeyword(searchKeyword)
                  }
                }}
              />
              <Button color="primary" className="me-1" onClick={() => setKeyword(searchKeyword)}>Cari</Button>         
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Card>
            <CardBody>
              <DataTable
                theme="default"
                columns={columns}
                data={registrations}
                customStyles={customStyles}
                pagination
                striped
                highlightOnHover
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </div>
  )
}