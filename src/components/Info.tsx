import { Col, Container, Nav, NavItem, NavLink, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useContents } from "@/data/contents";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function InfoPage() {
  const { artikels } = useContents()
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null && artikels?.length > 0) {
      setActive(artikels[0])
    }
  }, [artikels, active])

  return (
    <Container>
      <Row className="my-4">
        <Col className="mb-2">
          <Nav className="justify-content-center flex-column flex-sm-row row-gap-1 column-gap-1" pills>
            {artikels?.map(artikel => (
              <NavItem key={artikel.id} active={artikel.id === active?.id} >
                <NavLink
                  className='nav-link-balqis'
                  active={artikel.id === active?.id} 
                  href="#posts"
                  onClick={() => setActive(artikel)}
                >
                  {artikel.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col id="posts">
          <div id={active?.slug}>
            <h1>{active?.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>
              {active?.content}
            </ReactMarkdown>
          </div>
        </Col>
      </Row>
    </Container>
  )
}