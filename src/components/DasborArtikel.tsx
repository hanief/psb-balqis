import { useContents } from "@/data/contents";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from "reactstrap";
import { getRandomString } from '@/utils'
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function DasborArtikel({setDeleteConfirmationProps}) {
  const { artikels, createArtikel, updateArtikel, deleteArtikel } = useContents()
  const [activeArtikel, setActiveArtikel] = useState(null)

  function handleAddNew() {
    setActiveArtikel({
      id: getRandomString(),
      slug: 'artikel_baru',
      content: '',
      type: 'artikel',
      title: 'Artikel baru',
      isNew: true
    })
  }

  function handleCancel() {
    setActiveArtikel(null)
  }

  function handleSave() {
    if (!activeArtikel) return

    if (activeArtikel?.isNew) {
      const {isNew, ...newArtikel} = activeArtikel
      createArtikel(newArtikel)
    } else {
      updateArtikel(activeArtikel)
    }

    setActiveArtikel(null)
  }
  
  function handleDelete(artikel) {
    setDeleteConfirmationProps({
      isOpen: true,
      onConfirm: () => {
        deleteArtikel(artikel)
        setActiveArtikel(null)
      }
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-between">
          <h1>Artikel</h1>
          <Button className="mb-2 btn-balqis" onClick={handleAddNew}>
            <i className="bi-plus-circle me-2"></i>Buat artikel baru
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {!activeArtikel ? (
            <Table className="table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul Artikel</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
              {artikels?.map((artikel, index) => (
                <tr
                  key={artikel.id} 
                >
                  <td>{index + 1}</td>
                  <td>{artikel.title}</td>
                  <td className="d-flex gap-2">
                    <Button color="primary" onClick={() => setActiveArtikel(artikel)}><i className="bi-pencil me-2"></i>Ubah</Button>
                    <Button color="danger" onClick={() => handleDelete(artikel)}><i className="bi-trash me-2"></i>Hapus</Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-end gap-2 mb-2">
                <Button color="success" onClick={handleSave}><i className="bi-save me-2"></i>Simpan</Button>
                <Button color="secondary" onClick={handleCancel}><i className="bi-x-lg me-2"></i>Batal</Button>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="title">Judul</Label>
                  <Input
                    type="text"
                    value={activeArtikel?.title}
                    onChange={event => {
                      setActiveArtikel({
                        ...activeArtikel,
                        title: event.target.value,
                        slug: event.target.value.toLowerCase().replaceAll(' ', '_')
                      })
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="content">Isi</Label>
                  <MDEditor
                    height={500}
                    value={activeArtikel?.content}
                    onChange={newContent => {
                      setActiveArtikel({
                        ...activeArtikel,
                        content: newContent,
                      })
                    }}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}
