import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useContents } from "@/data/contents";

export default function InfoPage() {
  const { artikels } = useContents()
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null && artikels?.length > 0) {
      setActive(artikels[0])
    }
  }, [artikels, active])

  return (
    <Row className="my-4">
      <Col md="3" className="mb-2">
        <ListGroup>
          {artikels?.map(artikel => (
            <ListGroupItem
              className="list-group-item-success" 
              key={artikel.id} 
              action
              active={artikel.id === active?.id} 
              tag="a"
              href="#posts"
              onClick={() => setActive(artikel)}
            >
              {artikel.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
      <Col id="posts">
        <div id={active?.slug}>
          <h1>{active?.title}</h1>
          {active?.content}
        </div>
      </Col>
    </Row>
  )
}