import Link from 'next/link'
import Image from 'next/image'
import { Button, Col, Container, Row } from 'reactstrap'
import { useCountdown } from '@/hooks/useCountdown'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useProfile } from '@/model/profiles'
import Head from 'next/head'

export default function Layout({children}) {
  const { user, profile } = useProfile()
  const supabaseClient = useSupabaseClient()
  const [days, hours, minutes, seconds] = useCountdown(new Date('2023-08-15 15:00:00'))
  
  if (process.env.NEXT_PUBLIC_IS_MAINTENANCE === 'true') {
    return (
      <Container className="container my-5 justify-content-center">
        <Head>
          <title>Penerimaan Santri Baru BALQIS Jogja</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
        </Head>
        <div className="p-5 text-center bg-success-subtle rounded-3">
          <Image className='my-2' src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
          <h1 className="display-1 my-4">Segera hadir</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            Penerimaan santri baru akan dibuka dalam
          </p>
          <div id="countdown" className='my-2'>
            <div className="d-flex justify-content-center gap-3">
              <div className="countdown-item mx-4">
                <h1>{days}</h1>
                <div className="countdown-item__label">Hari</div>
              </div>
              <div className="countdown-item mx-4">
                <h1>{hours}</h1>
                <div className="countdown-item__label">Jam</div>
              </div>
              <div className="countdown-item mx-4">
                <h1>{minutes}</h1>
                <div className="countdown-item__label">Menit</div>
              </div>
            </div>
          </div>
          <div className="d-inline-flex gap-2 my-5">
            <Link href="https://balqisjogja.com" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4" type="button">
              <i className="bi bi-box-arrow-up-right me-2"></i>Kembali ke website Balqis
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <>
      <main className='pb-4'>
        <header className='py-2 text-white bg-balqis'>
          <div className="container d-flex flex-wrap align-items-center">
            <span className='me-2'>CS:</span>
            <Link className='btn btn-link no-underline text-light btn-sm me-2' href="https://wa.me/+6287871956868"><i className='bi-whatsapp me-1'></i>087871956868</Link>
            <Link className='btn btn-link no-underline text-light btn-sm' href="https://wa.me/+6281228594844"><i className='bi-whatsapp me-1'></i>081228594844</Link>
          </div>
        </header>
        <nav className="py-3 mb-4 border-bottom">
          <div className="container d-flex flex-wrap justify-content-between align-items-center">
            <Link href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
            <ul className="nav">
              {user ? (
                <>
                  {profile?.is_admin && (
                    <li className="nav-item">
                      <Link className="btn btn-outline-secondary me-2" href="/dasbor">Dasbor</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Button color="success" onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-success me-2" href="/masuk">
                    <strong>Masuk</strong>
                  </Link>
                </li>
              )}
            </ul>
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