import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import Jadwal from '@/posts/Jadwal.mdx'
import Jalur from '@/posts/Jalur.mdx'
import Beasiswa from '@/posts/Beasiswa.mdx'
import MateriTes from '@/posts/MateriTes.mdx'
import Biaya from '@/posts/Biaya.mdx'
import Program from '@/posts/Program.mdx'
import { useState } from "react";
import Brosur from "@/posts/Brosur";
import { useContents } from "@/data/contents";

export default function InfoPage() {
  const { artikels } = useContents()
  const [active, setActive] = useState(null)

  return (
    <Row className="my-4">
      <Col md="3" className="mb-2">
        <ListGroup>
          {artikels.map(artikel => (
            <ListGroupItem
              className="list-group-item-success" 
              key={artikel.id} 
              action
              active={artikel.id === active.id} 
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
        <div id={active.slug}>
          <h1>{active.title}</h1>
          {active.content}
        </div>
      </Col>
    </Row>
  )
}