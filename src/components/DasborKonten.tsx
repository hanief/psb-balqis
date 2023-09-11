import { useContents } from "@/data/contents";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from "reactstrap";
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"),{ ssr: false })

export default function DasborKonten() {
  const { kontens, updateArtikel } = useContents()
  const [activeArtikel, setActiveArtikel] = useState(null)

  function handleSave() {
    updateArtikel(activeArtikel)

    setActiveArtikel(null)
  } 

  function handleCancel() {
    setActiveArtikel(null)
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Konten Situs</h1>
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
              {kontens?.map((konten, index) => (
                <tr
                  key={konten.id} 
                >
                  <td>{index + 1}</td>
                  <td>{konten.title}</td>
                  <td className="d-flex gap-2">
                    <Button color="primary" onClick={() => setActiveArtikel(konten)}><i className="bi-pencil me-2"></i>Ubah</Button>
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
