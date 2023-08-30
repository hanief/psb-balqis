import { Button, Card, CardBody, Col, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { columns } from '@/data/columns'
import { convertToTitleCase } from "@/utils";
import { useProfile } from "@/data/profiles";
import { useRegistrations } from "@/data/registrations";
import dynamic from "next/dynamic"
import useDashboardColumnDefinitions from '@/data/dashboardColumnDefinition'

const DataViewerModal = dynamic(() => import('@/components/DataViewerModal'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })
const ExpandedRow = dynamic(() => import('@/components/ExpandedRow'), { ssr: false })
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false })

export default function Dasbor() {
  const { user, profile } = useProfile()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('nama_lengkap')
  const [showDeleted, setShowDeleted] = useState(false)

  const [dataViewerProps, setDataViewerProps] = useState({
    isOpen: false,
    registration: null,
  })
  
  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const { registrations, update, refreshData, remove, downloadBukti, downloadAsXLSX } = useRegistrations()
  
  const { definitions } = useDashboardColumnDefinitions(
    downloadBukti, 
    setDataViewerProps,
    update,
    setDeleteConfirmationProps,
    remove
  )

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

  if (user?.email !== 'admin@utama.app') {
    return (
      <Container>
        <Row>
          <Col>
            Sorry, you don&apos;t have access rights to this page.
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Row className="gap-0 row-gap-2">
        <Col xs="6" md="4">
          <Button
            color="outline-success"
            className="me-1"
            onClick={() => downloadAsXLSX(selectedColumn, keyword, showDeleted)}
          >
            <i className="bi-download me-1"></i>Unduh
          </Button>
        </Col>
        <Col xs="6" md="4" className="d-flex align-items-center justify-content-end">
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
        <Col md="4" className="d-flex align-items-center">
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
            <Button className="d-none d-lg-block" color="outline-success" onClick={() => setKeyword(searchKeyword)}>
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
                  let shouldShow = true

                  if (!showDeleted) {
                    shouldShow = registration.deleted_at === null
                  }

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

      {dataViewerProps.isOpen && (
        <DataViewerModal
          initialRegistration={dataViewerProps.registration}
          isOpen={dataViewerProps.isOpen}
          toggle={() => {
            setDataViewerProps({
              isOpen: !dataViewerProps.isOpen,
              registration: dataViewerProps.registration ? null : dataViewerProps.registration})
          }}
          onUpdate={refreshData}
        />
      )}

      {deleteConfirmationProps.isOpen && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmationProps.isOpen}
          toggle={() => setDeleteConfirmationProps({...deleteConfirmationProps, isOpen: !deleteConfirmationProps.isOpen})}
          onConfirm={deleteConfirmationProps.onConfirm}
          title={'Konfirmasi hapus'}
          description={'Apakah Anda yakin ingin menghapus data ini?'}
        />
      )}
    </>
  )
}