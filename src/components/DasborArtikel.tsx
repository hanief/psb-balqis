import { useContents } from "@/data/contents";
import { useState } from "react";
import { Button, Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from "reactstrap";
import { getRandomString } from '@/utils'

export default function DasborKonten() {
  const { artikels, createArtikel, updateArtikel, deleteArtikel } = useContents()
  const [activeArtikel, setActiveArtikel] = useState(null)
  const [newArtikel, setNewArtikel] = useState(null)

  function handleAddNew() {
    if (!newArtikel) {
      setNewArtikel({
        id: getRandomString(),
        slug: 'artikel_baru',
        content: '',
        type: 'artikel',
        title: 'Artikel baru'
      })

    }
  }

  function handleSaveNew() {
    createArtikel(newArtikel)

    setNewArtikel(null)
  }

  function handleDeleteNew() {
    setNewArtikel(null)
  }

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
          <Button className="mb-2 btn-balqis" style={{width: '100%'}} onClick={handleAddNew}>
            Buat artikel baru
          </Button>
          <ListGroup>
            {artikels?.map(artikel => (
              <ListGroupItem
                className="list-group-item-success" 
                key={artikel.id} 
                action
                active={!newArtikel && activeArtikel?.id === artikel.id} 
                tag="a"
                href="#posts"
                onClick={() => handleSetActiveArtikel(artikel)}
              >
                {artikel.title}
              </ListGroupItem>
            ))}
            {newArtikel && (
              <ListGroupItem
                className="list-group-item-success" 
                action
                active={newArtikel} 
                tag="a"
                href="#posts"
              >
                {newArtikel?.title}
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
        <Col id="posts">
          {newArtikel && (
          <div id={newArtikel?.slug}>
            <FormGroup>
              <Label for="title">Judul</Label>
              <Input
                type="text"
                value={newArtikel?.title}
                onChange={event => {
                  setNewArtikel({
                    ...newArtikel,
                    title: event.target.value,
                    slug: event.target.value.toLowerCase().replaceAll(' ', '_')
                  })
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Isi</Label>
              <Input 
                type="textarea"
                rows="10"
                value={newArtikel?.content}
                onChange={event => setNewArtikel({...newArtikel, content: event.target.value})}
              />
            </FormGroup>
            <div className="d-flex gap-2">
              <Button color="primary" onClick={handleSaveNew}>Simpan</Button>
              <Button color="danger" onClick={handleDeleteNew}>Hapus</Button>
            </div>
          </div>
          )}

          {!newArtikel && activeArtikel && (
          <div id={activeArtikel?.slug}>
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
              <Input 
                type="textarea"
                rows="10"
                value={activeArtikel?.content}
                onChange={event => setActiveArtikel({...activeArtikel, content: event.target.value})}
              />
            </FormGroup>
            <div className="d-flex gap-2">
              <Button color="success" onClick={handleSaveActiveArtikel}>Simpan</Button>
              <Button color="secondary" onClick={handleCancelActiveArtikel}>Batal</Button>
              <Button color="danger" onClick={handleDeleteActiveArtikel}>Hapus</Button>
            </div>
          </div>
          )}
          
        </Col>
      </Row>
    </Container>
  )
}
