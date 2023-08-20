import DataTable from "react-data-table-component"
import { useRegistrations } from "@/model/registration"
import { Button, Card, CardBody, Col, Input, InputGroup, Row } from "reactstrap";
import { useState } from "react";
import Head from "next/head";

export default function Dashboard() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('nama_lengkap')
  const { registrations, columns, getAsXLSX, downloadFile } = useRegistrations({selectedColumn, keyword})

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const ExpandedComponent = ({ data }) => {
    return (
      <table className="m-2">
        <tbody>
        {columns.map(column => (
          <tr key={column}>
            <th scope="row">{toTitleCase(column.split('_').join(' '))}: </th>
            <td>{data[column]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }

  const tableColumns = [
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
    {
      id: 'konfirmasi_pembayaran',
      name: 'Konfirmasi Pembayaran',
      cell: row => <Input type="checkbox" checked={row.bukti_pembayaran} disabled={!row.bukti_pembayaran}></Input>
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
            <select
              className="form-select"
              value={selectedColumn} 
              onChange={event => setSelectedColumn(event.target.value)}
            >
              {columns.map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
            <Input
              type="text" 
              placeholder={`Cari ${selectedColumn}`}
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
                columns={tableColumns}
                data={registrations}
                customStyles={customStyles}
                pagination
                striped
                highlightOnHover
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}