import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataEdit from "./DataEdit";

export default function DataViewerModal({isOpen, toggle, initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  function handleSave() {
    toggle()
  }

  return (
    <Modal 
      centered 
      size="xl" 
      isOpen={isOpen} 
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <span>Data Viewer</span>
      </ModalHeader>
      <ModalBody>
        <DataEdit
          initialRegistration={initialRegistration} 
          updateSpecificRegistrationData={updateSpecificRegistrationData} 
          onUpdate={onUpdate}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="outline-success" onClick={() => handleSave()}>Simpan</Button>
      </ModalFooter>
    </Modal>
  )
}