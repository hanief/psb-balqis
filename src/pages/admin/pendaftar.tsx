import { useRegistrations } from '@/data/registrations'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

const DasborData = dynamic(() => import('@/components/DasborData'), { ssr: false })
const DataViewerModal = dynamic(() => import('@/components/DataViewerModal'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })

export default function PendaftarPage() {
  const [dataViewerProps, setDataViewerProps] = useState({
    isOpen: false,
    registration: null,
  })

  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const { refreshData } = useRegistrations()

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