import Link from 'next/link'
import Image from 'next/image'
import { Button, Col, Collapse, Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Row } from 'reactstrap'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import {Toaster} from 'react-hot-toast'
import { isAdmin } from '@/utils'
import { useState } from 'react'
import ContactButton from './ContactButton'
import { useRouter } from 'next/router'
import { useSettings } from '@/data/settings'

export default function Layout({children}) {
  const user = useUser()
  const supabase = useSupabaseClient()
  const {settings} = useSettings()
  const [collapsed, setCollapsed] = useState(true);
  const { query, asPath } = useRouter()

  const toggleNavbar = () => setCollapsed(!collapsed) 
  if (process.env.NEXT_PUBLIC_IS_MAINTENANCE === 'true') {
    return (
      <Container className="container my-5 justify-content-center">
        <Head>
          <title>Penerimaan Santri Baru BALQIS Jogja</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
        </Head>
        <div className="p-5 text-center bg-success-subtle rounded-3">
          <Image className='my-2' src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
          <h1 className="display-1 my-4">Maaf website PSB BALQIS sedang dalam perawatan.</h1>
          <div className="d-inline-flex gap-2 my-5">
            <Link href="https://balqisjogja.com" className="d-inline-flex align-items-center btn btn-balqis btn-lg px-4" type="button">
              <i className="bi bi-box-arrow-up-right me-2"></i>Kembali ke website Balqis
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  if (isAdmin()) {
    return (
      <main className='bg-light'>
        <Head>
          <title>Admin PSB BALQIS Jogja</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
        </Head>
        <div><Toaster/></div>
        <nav className="py-3 border-bottom bg-success-subtle bg-gradient">
          <Container className='d-flex justify-content-between'>
            <Link href="/" className='me-2'>
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
            {user && (
              <Button size='sm' className='mt-2' color="outline-success" onClick={() => {
                supabase.auth.signOut()
              }}>Sign Out</Button>
            )}
          </Container>
        </nav>
        <Container fluid>
          <Row>
            <Col>
              {children}
            </Col>
          </Row>
        </Container>
      </main>
    )
  }

  return (
    <>
      <div><Toaster/></div>
      <main className='pb-4'>
        <header className='py-2 text-white bg-balqis'>
          <div className="container d-flex flex-wrap align-items-center">
            <span className=''><i className='bi-whatsapp'></i></span>
            <Link className='btn btn-link no-underline text-light btn-sm me-1' href="https://wa.me/+6287871956868">087871956868</Link>/
            <Link className='btn btn-link no-underline text-light btn-sm' href="https://wa.me/+6281228594844">081228594844</Link>
          </div>
        </header>
        <nav className="navbar navbar-expand-lg bg-success-subtle">
          <Container>
            <NavbarBrand tag={Link} href='/'>
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar}/>
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar className='ms-auto'>
                {settings?.pendaftaran_buka === 'true' && (
                <NavItem>
                  <NavLink 
                    className='text-success' 
                    tag={Link} 
                    href="/daftar" 
                    active={asPath === '/daftar'}
                  >
                    Daftar
                  </NavLink>
                </NavItem>
                )}
                <NavItem>
                  <NavLink 
                    className='text-success'
                    tag={Link} 
                    href="/status" 
                    active={asPath === '/status'}
                  >
                    Cek Status
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    className='text-success'
                    tag={Link} 
                    href="https://balqisjogja.com" 
                    target='_blank'
                  >
                    Web Balqis<i className='bi-box-arrow-up-right ms-1'></i>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </nav>
        <div className='mt-2'>
          {children}
        </div>
      </main>
      <footer className="py-3 bg-secondary-subtle container-fluid">
        <Container>
          <Row className='d-flex justify-content-between'>
            <Col md="6" lg="4">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
              <ul className="list-unstyled text-secondary text-small mt-2">
                <li>Jl. P. Mangkubumi, Karangijo Kulon</li>
                <li>Ponjong, Gunungkidul</li>
                <li>D.I Yogyakarta 55892</li>
              </ul>
            </Col>
            <Col md="6" lg="4">
              <h5>Kontak</h5>
              <ul className="list-unstyled text-small">
                <li><Link className='link-secondary no-underline' href="https://wa.me/+6287871956868"><i className='bi bi-whatsapp me-1'></i>CS1: 087871956868</Link></li>
                <li><Link className='link-secondary no-underline' href="https://wa.me/+6281228594844"><i className='bi bi-whatsapp me-1'></i>CS2: 081228594844</Link></li>
                <li><Link className='link-secondary no-underline' href="https://balqisjogja.com"><i className='bi bi-box-arrow-up-right me-1'></i>https://balqisjogja.com</Link></li>
              </ul>
            </Col>
            <Col md="6" lg="4">
              <h5>Media Sosial</h5>
              <ul className="list-unstyled text-small">
                <li><Link className='link-secondary no-underline' href="https://www.tiktok.com/@balqisjogja"><i className='bi bi-tiktok me-1'></i>Tiktok</Link></li>
                <li><Link className='link-secondary no-underline' href="https://www.youtube.com/channel/UCNdy_xWCmuEy7uSRkKd2dsg"><i className='bi bi-youtube me-1'></i>Youtube</Link></li>
                <li><Link className='link-secondary no-underline' href="https://www.instagram.com/balqisjogja"><i className='bi bi-instagram me-1'></i>Instagram</Link></li>
                <li><Link className='link-secondary no-underline' href="https://www.facebook.com/baitulquranyogyakarta"><i className='bi bi-facebook me-1'></i>Facebook</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <ContactButton />
    </>  
  )
}