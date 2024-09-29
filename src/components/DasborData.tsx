import { Button, Card, CardBody, Col, Container, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import MultiSelect from "./MultiSelect"
import { useState } from "react"
import dynamic from "next/dynamic"
import { columns } from "@/data/columns"
import { convertToTitleCase } from "@/utils/utils"
import { useRegistrations } from "@/data/registrations"
import useDashboardColumnDefinition from "@/data/dashboardColumnDefinition"

const ExpandedRow = dynamic(() => import('@/components/ExpandedRow'), { ssr: false })
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false })

export default function DasborData({setDataViewerProps, setDeleteConfirmationProps}) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('nama_lengkap')
  const [showDeleted, setShowDeleted] = useState(false)
  const tableColumns = [
    {
      name: 'nomor',
      show: true,
    },
    {
      name: 'nama_lengkap',
      show: true,
    },
    {
      name: 'nik',
      show: true,
    },
    {
      name: 'jenjang',
      show: true,
    },
    {
      name: 'jalur_pendaftaran',
      show: true,
    },
    {
      name: 'created_at',
      show: true,
    },
    {
      name: 'bukti_pembayaran',
      show: true,
    },
    {
      name: 'pembayaran_diterima',
      show: true,
    },
    {
      name: 'actions',
      show: true,
    },
  ]
  
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

  const { registrations, update, remove, downloadBukti, downloadAsXLSX } = useRegistrations()
  
  const { definitions } = useDashboardColumnDefinition(
    downloadBukti, 
    setDataViewerProps,
    update,
    setDeleteConfirmationProps,
    remove,
    tableColumns.filter(column => column.show).map(column => column.name),
  )

  return (
    <Container fluid>
      <Row className="">
        <Col>
          <h1 className="">Pendaftar</h1>
        </Col>
      </Row>
      <Row className="gap-0 row-gap-2 mt-2">
        <Col xs="6" md="3">
          <Button
            color="outline-success"
            className="me-1"
            onClick={() => downloadAsXLSX(selectedColumn, keyword, showDeleted)}
          >
            <i className="bi-download me-1"></i>Unduh
          </Button>
        </Col>
        <Col xs="6" md="3" className="d-flex align-items-center justify-content-end">
          <FormGroup switch>
            <Input 
              type="switch" 
              role="switch" 
              checked={showDeleted}
              onChange={() => setShowDeleted(!showDeleted)}
            />
            <Label check>Lihat terhapus</Label>
          </FormGroup>
        </Col>
        <Col md="6" className="d-flex align-items-center">
          <InputGroup>
            <select
              className="form-select"
              value={selectedColumn} 
              onChange={event => setSelectedColumn(event.target.value)}
            >
              {columns.map(column => (
                <option key={column} value={column}>{convertToTitleCase(column)}</option>
              ))}
            </select>
            <Input
              type="text" 
              placeholder={`Cari ${convertToTitleCase(selectedColumn)}`}
              value={searchKeyword} 
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  setKeyword(searchKeyword)
                }
              }}
            />
            <Button className="" color="outline-success" onClick={() => setKeyword(searchKeyword)}>
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
                columns={definitions}
                data={registrations?.filter(registration => {
                  let shouldShow = showDeleted ? registration.deleted_at : !registration.deleted_at

                  if (selectedColumn && keyword) {
                    shouldShow = shouldShow && registration[selectedColumn]?.toLowerCase().includes(keyword.toLowerCase())
                  }

                  return shouldShow
                })}
                customStyles={customStyles}
                highlightOnHover
                striped
                expandableRows
                expandableRowsComponent={ExpandedRow}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}