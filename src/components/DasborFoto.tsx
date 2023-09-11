import { useFileContents } from "@/data/contents"
import { Button, Col, Container, Row, Table } from "reactstrap"
import UploadFileModal from "./UploadFileModal"
import { useState } from "react"

export default function DasborFoto({setDeleteConfirmationProps}) {
  const { slides, downloadFile, deleteFile } = useFileContents()
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleDeleteFile(fileName) {

    setDeleteConfirmationProps({
      isOpen: true,
      onConfirm: () => {
        deleteFile(fileName)
      }
    })
  }

  function handleAddNew() {
    setIsModalOpen(true)
  }

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-between">
          <h1>Foto</h1>
          <Button className="btn-balqis mb-2" onClick={handleAddNew}><i className="bi-plus-circle me-2"></i>Tambah foto baru</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>File</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {slides?.map((file, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{file.name}</td>
                  <td className="d-flex gap-2">
                    <Button color="success" onClick={() => downloadFile(file.name)}>
                      <i className="bi-download me-2"></i>Unduh
                    </Button>
                    <Button color="danger" onClick={() => handleDeleteFile(file.name)}>
                      <i className="bi-trash me-2"></i>Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UploadFileModal 
            isOpen={isModalOpen}
            toggle={() => setIsModalOpen(!isModalOpen)}
          />
        </Col>
      </Row>
    </Container>
  )
}
