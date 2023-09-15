import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

const DasborArtikel = dynamic(() => import('@/components/DasborArtikel'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })

export default function ArtikelPage() {

  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  return (
    <Fragment>
      <DasborArtikel 
        setDeleteConfirmationProps={setDeleteConfirmationProps}
      />
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