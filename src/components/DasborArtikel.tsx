import { useContents } from "@/data/contents";
import { useState } from "react";
import { Button, Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from "reactstrap";
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { getRandomString } from '@/utils'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default function DasborKonten() {
  const { artikels, createArtikel, updateArtikel, deleteArtikel } = useContents()
  const [activeArtikel, setActiveArtikel] = useState(null)
  const [newArtikel, setNewArtikel] = useState(null)
  const [editorState, setEditorState] = useState(null)

  function handleAddNew() {
    if (!newArtikel) {
      setNewArtikel({
        id: getRandomString(),
        slug: 'artikel_baru',
        content: '',
        type: 'artikel',
        title: 'Artikel baru'
      })

      setEditorState(EditorState.createEmpty())
    }
  }

  function handleSaveNew() {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const artikel = {
      ...newArtikel,
      content: content
    }
    createArtikel(artikel)

    setNewArtikel(null)
    setEditorState(null)
  }

  function handleDeleteNew() {
    setNewArtikel(null)
    setEditorState(null)
  }

  function handleSetActiveArtikel(artikel) {
    setActiveArtikel(artikel)

    const blocksFromHtml = htmlToDraft(artikel.content)
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditorState(EditorState.createWithContent(contentState))
  }

  function handleEditorStateChange(editorState) {
    setEditorState(editorState)
  }

  function handleSaveActiveArtikel() {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const artikel = {
      ...activeArtikel,
      content: content
    }

    updateArtikel(artikel)

    setActiveArtikel(null)
    setEditorState(null)
  } 

  function handleCancelActiveArtikel() {
    setActiveArtikel(null)
    setEditorState(null)
  }
  
  function handleDeleteActiveArtikel() {
    deleteArtikel(activeArtikel)
    
    setActiveArtikel(null)
    setEditorState(null)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button color="primary" onClick={handleAddNew}>Add new</Button>
        </Col>
      </Row>
      <Row className="my-4">
      <Col md="3" className="mb-2">
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
            <Editor 
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={handleEditorStateChange}
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
            <Editor 
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={handleEditorStateChange}
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
