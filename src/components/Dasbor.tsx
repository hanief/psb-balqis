import { Col, Container, Row } from "reactstrap";
import { useUser } from "@supabase/auth-helpers-react";
import { useRegistrations } from "@/data/registrations";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";

const DasborData = dynamic(() => import('@/components/DasborData'), { ssr: false })
const DataViewerModal = dynamic(() => import('@/components/DataViewerModal'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })

export default function Dasbor() {
  const user = useUser()
  const [dataViewerProps, setDataViewerProps] = useState({
    isOpen: false,
    registration: null,
  })

  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const { refreshData } = useRegistrations()

  if (user?.email !== 'admin@utama.app') {
    return (
      <Container fluid>
        <Row>
          <Col>
            Sorry, you don&apos;t have access rights to this page.
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Fragment>
      <DasborData 
        setDataViewerProps={setDataViewerProps}
        setDeleteConfirmationProps={setDeleteConfirmationProps}
      />
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
    </Fragment>
  )
}