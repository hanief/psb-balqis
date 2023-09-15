import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

const DasborFoto = dynamic(() => import('@/components/DasborFoto'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })

export default function FotoPage() {
  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  return (
    <Fragment>
      <DasborFoto 
        setDeleteConfirmationProps={setDeleteConfirmationProps}
      />
      {deleteConfirmationProps.isOpen && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmationProps.isOpen}
          toggle={() => setDeleteConfirmationProps({...deleteConfirmationProps, isOpen: !deleteConfirmationProps.isOpen})}
          onConfirm={deleteConfirmationProps.onConfirm}
          title={'Konfirmasi hapus foto'}
          description={'Apakah anda yakin ingin menghapus foto ini?'}
        />
      )}
    </Fragment>
  )
}