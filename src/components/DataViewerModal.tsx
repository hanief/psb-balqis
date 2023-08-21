import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataEdit from "./DataEdit";
import { useRegistration } from "@/model/pendaftaran";

export default function DataViewerModal({isOpen, toggle, initialRegistration, onUpdate}) {
  const {singleRegistration: registration} = useRegistration({
    specificUserId: initialRegistration?.user_id,
    selectedColumn: null,
    keyword: null,
  })

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
        <DataEdit initialRegistration={initialRegistration} onUpdate={onUpdate}/>
      </ModalBody>
      <ModalFooter>
        <Button color="outline-success" onClick={() => handleSave()}>Simpan</Button>
      </ModalFooter>
    </Modal>
  )
}