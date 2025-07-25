import { Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, UncontrolledDropdown } from "reactstrap";
import { useEffect, useState } from "react";
import { useContents } from "@/data/contents";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Link from "next/link";
import { useRouter } from "next/router";
import { title } from "process";

export default function InfoPage() {
  const { artikels } = useContents()
  const router = useRouter()
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null && artikels?.length > 0) {
      setActive(artikels[0])
    }
  }, [artikels, active])

  return (
    <Container>
      <Row className="my-2">
        <Col className="mb-2">
          <UncontrolledDropdown className="d-grid d-md-none mb-2" direction="up">
            <DropdownToggle caret className='btn btn-balqis px-3'>
              Daftar
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} href='/daftar/sd' active={router?.asPath === '/daftar/sd'}>Daftar SD</DropdownItem>
              <DropdownItem tag={Link} href='/daftar/smp' active={router?.asPath === '/daftar/smp'}>Daftar SMP</DropdownItem>
              <DropdownItem tag={Link} href='/daftar/sma' active={router?.asPath === '/daftar/sma'}>Daftar SMA</DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem tag={Link} href="/status">Cek status</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="d-flex flex-column flex-md-row justify-content-between row-gap-1 column-gap-1 mb-2">
            <div className="ratio ratio-16x9">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/lrfRVrzzPzM?si=EtddMNzCl4RztuWi" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="ratio ratio-16x9">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/fotzkZEH2tA?si=afEmpRMx7WM20ZVp" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <Nav className="justify-content-center flex-column flex-sm-row row-gap-1 column-gap-1 mb-2" pills>
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