import DataTable from "react-data-table-component"
import { useRegistrations } from "@/model/registration"
import { Button, Col, Input, InputGroup, Row } from "reactstrap";
import { useState } from "react";

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
    name: 'Tanggal Lahir',
    selector: row => row.tanggal_lahir,
    sortable: true,
  },
  {
    name: 'Nama Ayah / Wali 1',
    selector: row => row.nama_ayah,
    sortable: true,
  },
  {
    name: 'HP Ayah / Wali 1',
    selector: row => row.nomor_hp_ayah,
    sortable: true,
  },
  {
    name: 'Nama Ibu / Wali 2',
    selector: row => row.nama_ibu,
    sortable: true,
  },
  {
    name: 'HP Ibu / Wali 2',
    selector: row => row.nomor_hp_ibu,
    sortable: true,
  },
];

export default function Dashboard() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const { registrations, getAsCSV } = useRegistrations({keyword})
  
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
      <Row>
        <Col>
        <DataTable
          theme="default"
          columns={columns}
          data={registrations}
        />
        </Col>
      </Row>
      
    </div>
  )
}