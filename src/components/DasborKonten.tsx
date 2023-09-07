import { useContents } from "@/data/contents";
import { useState } from "react";
import { Button, Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from "reactstrap";
import dynamic from "next/dynamic"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
)

export default function DasborKonten() {
  const { kontens, createArtikel, updateArtikel, deleteArtikel } = useContents()
  const [activeArtikel, setActiveArtikel] = useState(null)

  function handleSetActiveArtikel(artikel) {
    setActiveArtikel(artikel)
  }

  function handleSaveActiveArtikel() {
    updateArtikel(activeArtikel)

    setActiveArtikel(null)
  } 

  function handleCancelActiveArtikel() {
    setActiveArtikel(null)
  }
  
  function handleDeleteActiveArtikel() {
    deleteArtikel(activeArtikel)
    
    setActiveArtikel(null)
  }

  return (
    <Container>
      <Row className="my-4">
        <Col md="3" className="mb-2">
          <ListGroup>
            {kontens?.map(artikel => (
              <ListGroupItem
                className="list-group-item-success d-flex justify-content-between align-items-center" 
                key={artikel.id} 
                action
                active={activeArtikel?.id === artikel.id} 
                tag="a"
                href="#posts"
                onClick={() => handleSetActiveArtikel(artikel)}
              >
                {artikel.title}
                <i className="bi-chevron-right"></i>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col id="posts">
          {activeArtikel && (
          <div id={activeArtikel?.slug}>
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
            <div className="d-flex justify-content-between gap-2">
              <Button color="success" onClick={handleSaveActiveArtikel}>Simpan</Button>
              <Button color="secondary" onClick={handleCancelActiveArtikel}>Batal</Button>
            </div>
          </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}
