import { useFileContents } from "@/data/contents"
import { Button, Col, Container, Row, Table } from "reactstrap"
import UploadFileModal from "./UploadFileModal"
import { useState } from "react"

export default function DasborSlide({setDeleteConfirmationProps}) {
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
    <Container>
      <Row className="my-4">
        <Col className="mb-2">
          <Button className="btn-balqis mb-2" onClick={handleAddNew}>Tambah foto baru</Button>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>FileName</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {slides?.map((file, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{file.name}</td>
                  <td className="d-flex gap-2">
                    <Button color="success" onClick={() => downloadFile(file.name)}>Unduh</Button>
                    <Button color="danger" onClick={() => handleDeleteFile(file.name)}>Hapus</Button>
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
