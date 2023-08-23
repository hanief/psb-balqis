import DataTable from "react-data-table-component"
import { usePendaftaran } from "@/data/pendaftaran";
import { Button, Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useState } from "react";
import Head from "next/head";
import FileViewerModal from "@/components/FileViewerModal";
import DataViewerModal from "@/components/DataViewerModal";
import { DateTime } from 'luxon'
import { columns } from '@/data/columns'
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { formatDataWithWilayahNames, formatDatumWithWilayahNames } from "@/utils";

export default function Dashboard() {
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
    userId: null,
  })

  const {registrations, downloadAsXLSX, downloadBukti, refreshData, deleteData, updateSpecificRegistrationData} = usePendaftaran({
    specificUserId: null,
    selectedColumn: selectedColumn, 
    keyword: keyword,
    showDeleted: showDeleted
  })
  
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
      <table className="table m-2">
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
      format: row => row.jenjang?.toUpperCase(),
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
      id: 'created_at',
      name: 'Tanggal',
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
          <Button color="outline-success" onClick={() => downloadBukti(row.nama_lengkap, row.bukti_pembayaran)}>
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
        disabled={!row.bukti_pembayaran}
        onChange={e => {
          updateSpecificRegistrationData(row.user_id, {pembayaran_diterima: e.target.checked})
        }}
      />
    },
    {
      id: 'view_data',
      name: 'Actions',
      cell: row => (
        <>
          <Button className="me-1" color="outline-success" onClick={() => setDataViewerProps({
            isOpen: true,
            registration: row,
          })}>
            Ubah
          </Button>
          {row.deleted_at ? (
            <Button color="outline-success" onClick={() => updateSpecificRegistrationData(row.user_id, {deleted_at: null})}>
              <i className="bi bi-recycle"></i>
            </Button>
          ) : (
            <Button color="outline-danger" onClick={() => setDeleteConfirmationProps({
              isOpen: true,
              onConfirm: () => deleteData(row.user_id),
              userId: row.user_id,
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

  return (
    <div className="container">
      <Head>
        <title>Dashboard PSB Balqis</title>
      </Head>
      <Row className="gap-0 row-gap-2">
        <Col xs="6" md="4">
          <Button
            color="outline-success"
            className="me-1"
            onClick={() => downloadAsXLSX()}
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
              onClick={() => setShowDeleted(!showDeleted)}
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
                theme="default"
                columns={tableColumns}
                data={registrations?.filter(registration => {
                  let shouldShow = true
                  if (!showDeleted) {
                    shouldShow = registration.deleted_at === null
                  }
                  if (selectedColumn && keyword) {
                    shouldShow = registration[selectedColumn]?.toLowerCase().includes(keyword.toLowerCase())
                  }

                  return shouldShow
                })}
                customStyles={customStyles}
                striped
                highlightOnHover
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <FileViewerModal
        isOpen={fileViewerProps.isOpen}
        toggle={() => setFileViewerProps({...fileViewerProps, isOpen: !fileViewerProps.isOpen})}
        type={fileViewerProps.type}
        url={fileViewerProps.url}
        onClose={() => console.log('closed')}
      />

      <DataViewerModal
        initialRegistration={dataViewerProps.registration}
        updateSpecificRegistrationData={updateSpecificRegistrationData}
        isOpen={dataViewerProps.isOpen}
        toggle={() => setDataViewerProps({...dataViewerProps, isOpen: !dataViewerProps.isOpen})}
        onUpdate={() => refreshData()}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmationProps.isOpen}
        toggle={() => setDeleteConfirmationProps({...deleteConfirmationProps, isOpen: !deleteConfirmationProps.isOpen})}
        onConfirm={deleteConfirmationProps.onConfirm}
        title={'Konfirmasi hapus'}
        description={'Apakah Anda yakin ingin menghapus data ini?'}
      />
    </div>
  )
}