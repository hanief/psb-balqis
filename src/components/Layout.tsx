import Link from 'next/link'
import Image from 'next/image'
import { Button, Col, Container, Row } from 'reactstrap'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useProfile } from '@/data/profiles'
import Head from 'next/head'
import {Toaster} from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Layout({children}) {
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
            <Link href="https://balqisjogja.com" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">
              <i className="bi bi-box-arrow-up-right me-2"></i>Kembali ke website Balqis
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  if (process.env.NEXT_PUBLIC_IS_ADMIN === 'true') {
    return (
      <main >
        <Head>
          <title>Admin PSB BALQIS Jogja</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
        </Head>
        <div><Toaster/></div>
        <nav className="py-3 border-bottom">
          <div className="container d-flex flex-wrap justify-content-center align-items-center">
            <Link href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
          </div>
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
      <main className='pb-4'>
        <div><Toaster/></div>
        <header className='py-2 text-white bg-balqis'>
          <div className="container d-flex flex-wrap align-items-center">
            <span className=''><i className='bi-whatsapp'></i></span>
            <Link className='btn btn-link no-underline text-light btn-sm me-1' href="https://wa.me/+6287871956868">087871956868</Link>/
            <Link className='btn btn-link no-underline text-light btn-sm' href="https://wa.me/+6281228594844">081228594844</Link>
          </div>
        </header>
        <nav className="py-3 mb-4 border-bottom">
          <div className="container d-flex flex-wrap justify-content-between align-items-center">
            <Link href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
          </div>
        </nav>
        {children}
      </main>
      <footer className="py-3 bg-success-subtle container-fluid">
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
    </>  
  )
}