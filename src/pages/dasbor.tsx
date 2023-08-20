import DataTable from "react-data-table-component"
import { useRegistrations } from "@/model/registration"
import { Button, Card, CardBody, Col, Input, InputGroup, Row } from "reactstrap";
import { useState } from "react";
import Head from "next/head";

export default function Dashboard() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const { registrations, getAsXLSX, downloadFile } = useRegistrations({keyword})
  
  const columns = [
  {
    id: 'number',
    name: 'No',
    selector: (row, index) => index + 1,
    sortable: false,
    width: '60px',
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
    selector: row => row.jenjang,
    sortable: true,
  },
  {
    id: 'jalur_pendaftaran',
    name: 'Jalur',
    selector: row => row.jalur_pendaftaran,
    sortable: true,
  },
  {
    id: 'jenis_kelamin',
    name: 'Jenis Kelamin',
    selector: row => row.jenis_kelamin,
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
        <Button color="primary" onClick={() => downloadFile(row.nama_lengkap, row.bukti_pembayaran)}>
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
      <Head>
        <title>Dashboard PSB Balqis</title>
      </Head>
      <Row>
        <Col>
          <Button
            color="primary"
            className="me-1"
            onClick={() => getAsXLSX()}
          >
            <i className="bi-download me-1"></i>Download
          </Button>
        </Col>
        <Col> 
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
            <Button color="primary" className="me-1" onClick={() => setKeyword(searchKeyword)}>
              <i className="bi-search"></i>
            </Button>         
          </InputGroup>
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