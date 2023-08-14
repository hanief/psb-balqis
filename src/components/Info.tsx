import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import Jadwal from '@/posts/Jadwal.mdx'
import Jalur from '@/posts/Jalur.mdx'
import Beasiswa from '@/posts/Beasiswa.mdx'
import MateriTes from '@/posts/MateriTes.mdx'
import Biaya from '@/posts/Biaya.mdx'
import Program from '@/posts/Program.mdx'
import { useState } from "react";
import Brosur from "@/posts/Brosur";

export default function InfoPage() {
  const [active, setActive] = useState(0)

  const posts = [
    {
      title: 'Brosur',
      slug: 'brosur',
      component: <Brosur/>,
    },
    {
      title: 'Timeline',
      slug: 'timeline',
      component: <Jadwal/>,
    },
    {
      title: 'Jalur Masuk',
      slug: 'jalur',
      component: <Jalur/>,
    },
    {
      title: 'Beasiswa',
      slug: 'beasiswa',
      component: <Beasiswa/>,
    },
    {
      title: 'Biaya Pendidikan',
      slug: 'biaya',
      component: <Biaya/>,
    },
    {
      title: 'Program Unggulan',
      slug: 'program',
      component: <Program/>,
    },
    {
      title: 'Materi Tes Seleksi',
      slug: 'tes',
      component: <MateriTes/>,
    }
  ]

  return (
    <Row>
      <Col md="3">
        <ListGroup>
          {posts.map((post, index) => (
            <ListGroupItem
              className="list-group-item-success" 
              key={index} 
              action
              active={index === active} 
              tag="a"
              href="#posts"
              onClick={() => setActive(index)}
            >
              {post.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
      <Col id="posts">
        <div id={posts[active].slug}>
          {posts[active].component}
        </div>
      </Col>
    </Row>
  )
}