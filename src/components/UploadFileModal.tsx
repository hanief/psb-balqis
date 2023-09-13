import { useFileContents } from "@/data/fileContents";
import { useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function UploadFileModal({isOpen, toggle}) {
  const { uploadFile } = useFileContents()

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Upload File</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="upload">Pilih berkas</Label>
          <Input 
            type="file"
            id="upload"
            name="upload"
            accept="image/*"
            onChange={event => {
              const file = event.target.files[0]

              uploadFile(file)
              toggle()
            }}
          />
            
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Tutup</Button>
      </ModalFooter>
    </Modal>
  )
}