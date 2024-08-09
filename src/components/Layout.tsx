import Link from 'next/link'
import Image from 'next/image'
import { Button, Col, Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Row, UncontrolledDropdown } from 'reactstrap'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import {Toaster} from 'react-hot-toast'
import { isAdmin } from '@/utils/utils'
import { Fragment, useEffect, useState } from 'react'
import ContactButton from './ContactButton'
import { useRouter } from 'next/router'
import { useSettings } from '@/data/settings'

export default function Layout({children}) {
  const user = useUser()
  const supabase = useSupabaseClient()
  const {settings} = useSettings()
  const [collapsed, setCollapsed] = useState(true)
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsSidebarCollapsed(window?.screen.width < 400)
    }
  }, [])

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
      <div className='d-flex flex-nowrap'>
        {user && !isSidebarCollapsed && (
        <aside className="d-flex flex-column p-3 text-bg-dark" style={{height: '100vh'}}>
          <div className="d-flex align-items-center justify-content-between mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <Link href="/">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
          </div>
          <hr/>
          <Nav pills className="flex-column mb-auto">
            <NavItem>
              <Link href="/" className={`nav-link ${router.asPath === '/' ? 'active' : 'text-white'}`} aria-current={router.asPath === '/'}>
                <i className='bi-people me-2 text-white'></i>Pendaftar
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/admin/artikel" className={`nav-link ${router.asPath === '/admin/artikel' ? 'active' : 'text-white'}`} aria-current={router.asPath === '/admin/artikel'}>
                <i className='bi-body-text me-2 text-white'></i>Artikel
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/admin/konten" className={`nav-link ${router.asPath === '/admin/konten' ? 'active' : 'text-white'}`} aria-current={router.asPath === '/admin/konten'}>
                <i className='bi-type me-2 text-white'></i>Konten
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/admin/foto" className={`nav-link ${router.asPath === '/admin/foto' ? 'active' : 'text-white'}`} aria-current={router.asPath === '/admin/foto'}>
                <i className='bi-image me-2 text-white'></i>Foto
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/admin/pengaturan" className={`nav-link ${router.asPath === '/admin/pengaturan' ? 'active' : 'text-white'}`} aria-current={router.asPath === '/admin/pengaturan'}>
                <i className='bi-gear me-2 text-white'></i>Pengaturan
              </Link>
            </NavItem>
          </Nav>
          <hr/>
          <Button className="dropdown-item" onClick={() => {
            router.push('/')
            supabase.auth.signOut()
          }}>
            <i className='bi-door-closed me-2 text-white'></i>Keluar
          </Button>
        </aside>
        )}
        <main className="container-fluid">
          <Head>
            <title>Admin PSB BALQIS Jogja</title>
            <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
          </Head>
          <div><Toaster/></div>
          {user && (
            <Navbar className='bg-light mb-2'>
              <Container fluid>
                <Button color='outline-success' onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}><i className='bi-list'></i></Button>
              </Container>
            </Navbar>
          )}
          {children}
        </main>
      </div>
    )
  }

  return (
    <Fragment>
      <div><Toaster/></div>
      <main className='pb-4'>
        <header className='py-2 text-white bg-balqis'>
          <Container className=' d-flex justify-content-between'>
            <div className="d-flex flex-wrap align-items-center">
              <span className=''><i className='bi-whatsapp'></i></span>
              <Link className='btn btn-link no-underline text-light btn-sm me-1' href="https://wa.me/+6287871956868">087871956868</Link>/
              <Link className='btn btn-link no-underline text-light btn-sm' href="https://wa.me/+6281228594844">081228594844</Link>
            </div>
            <div className="">
              <Link className='btn btn-link no-underline text-light btn-sm' href="https://balqisjogja.com" target='_blank'>Web Balqis<i className='bi-box-arrow-up-right ms-1'></i></Link>
            </div>
          </Container>
        </header>
        <nav className="navbar navbar-expand-lg bg-success-subtle sticky-top">
          <Container>
            <NavbarBrand tag={Link} href='/'>
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </NavbarBrand>
            <Nav navbar className='ms-auto'>
              {router?.pathname !== '/daftar/[jenjang]' && settings?.pendaftaran_buka === 'true' && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className='btn btn-balqis px-3'>
                    Pendaftaran
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} href='/daftar/sd' active={router?.asPath === '/daftar/sd'}>Daftar SD</DropdownItem>
                    <DropdownItem tag={Link} href='/daftar/smp' active={router?.asPath === '/daftar/smp'}>Daftar SMP</DropdownItem>
                    <DropdownItem tag={Link} href='/daftar/sma' active={router?.asPath === '/daftar/sma'}>Daftar SMA</DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem tag={Link} href="/status">Cek status</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          </Container>
        </nav>
        {children}
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
                <li><Link className='link-secondary no-underline' href="https://wa.me/+6287871956868"><i className='bi bi-whatsapp me-1'></i>Admin PSB SMP SMA : 087871956868</Link></li>
                <li><Link className='link-secondary no-underline' href="https://wa.me/+6281228594844"><i className='bi bi-whatsapp me-1'></i>Admin PSB SD : 081228594844</Link></li>
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
    </Fragment>  
  )
}