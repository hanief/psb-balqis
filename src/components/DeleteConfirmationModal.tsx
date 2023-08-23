import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function DeleteConfirmationModal({isOpen, toggle, title, description, onConfirm}) {
  function handleConfirm() {
    toggle()
    onConfirm()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title || 'Konfirmasi hapus'}</ModalHeader>
      <ModalBody>
        {description || 'Apakah Anda yakin ingin menghapus data ini?'}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleConfirm}>Hapus</Button>{' '}
        <Button color="secondary" onClick={toggle}>Batal</Button>
      </ModalFooter>
    </Modal>
  )
}