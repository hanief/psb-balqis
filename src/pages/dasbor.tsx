import DataTable from "react-data-table-component"
import { Button, Card, CardBody, Col, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import FileViewerModal from "@/components/FileViewerModal";
import DataViewerModal from "@/components/DataViewerModal";
import { DateTime } from 'luxon'
import { columns } from '@/data/columns'
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { formatDatumWithWilayahNames } from "@/utils";
import { useProfile } from "@/data/profiles";
import { useRouter } from "next/router";
import { useRegistrations } from "@/data/registrations";

export default function Dasbor() {
  const router = useRouter()
  const { profile } = useProfile()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('nama_lengkap')
  const [showDeleted, setShowDeleted] = useState(false)
  const [fileViewerProps, setFileViewerProps] = useState({
    isOpen: false,
    type: '',
    url: '',
  })

  const [dataViewerProps, setDataViewerProps] = useState({
    isOpen: false,
    registration: null,
  })
  
  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const { registrations, update, refreshData, remove, downloadBukti, downloadAsXLSX } = useRegistrations()
  
  function toTitleCase(str) {
    if (!str) return ''

    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const ExpandedComponent = ({ data }) => {
    const formattedData = formatDatumWithWilayahNames(data, 1)

    return (
      <table className="table table-striped m-2">
        <tbody>
        {columns.map(column => (
          <tr key={column}>
            <th scope="row">{toTitleCase(column.replaceAll('_', ' '))}</th>
            <td>:</td>
            <td>{formattedData[column]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }

  const tableColumns = [
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
            console.log('registration', row)
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

  if (!profile?.is_admin) {
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
    <Container>
      <Head>
        <title>Dashboard PSB Balqis</title>
      </Head>
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
                <option key={column} value={column}>{toTitleCase(column.replaceAll('_', ' '))}</option>
              ))}
            </select>
            <Input
              type="text" 
              placeholder={`Cari ${toTitleCase(selectedColumn?.replaceAll('_', ' '))}`}
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
                columns={tableColumns}
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
                expandableRowsComponent={ExpandedComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

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

      <DeleteConfirmationModal
        isOpen={deleteConfirmationProps.isOpen}
        toggle={() => setDeleteConfirmationProps({...deleteConfirmationProps, isOpen: !deleteConfirmationProps.isOpen})}
        onConfirm={deleteConfirmationProps.onConfirm}
        title={'Konfirmasi hapus'}
        description={'Apakah Anda yakin ingin menghapus data ini?'}
      />
    </Container>
  )
}