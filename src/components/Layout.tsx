import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Button, Container } from 'reactstrap'
import { useCountdown } from '@/hooks/useCountdown'

export default function Layout({children}) {
  const {data: session, status} = useSession()
  const [days, hours, minutes, seconds] = useCountdown(new Date('2023-08-15 00:00:00'))
  
  if (process.env.NEXT_PUBLIC_IS_MAINTENANCE === 'true') {
    return (
      <Container className="container my-5 justify-content-center">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <Image className='my-2' src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
          <h1 className="text-body-emphasis my-2">Segera hadir</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            Pendaftaran santri baru akan dibuka dalam
          </p>
          <div id="countdown" className='my-2'>
            <div className="d-flex justify-content-center gap-3">
              <div className="countdown-item">
                <h1 className="h2">{days}</h1>
                <div className="countdown-item__label">Hari</div>
              </div>
              <div className="countdown-item">
                <h1 className="h2">{hours}</h1>
                <div className="countdown-item__label">Jam</div>
              </div>
              <div className="countdown-item">
                <h1 className="h2">{minutes}</h1>
                <div className="countdown-item__label">Menit</div>
              </div>
            </div>
          </div>
          <div className="d-inline-flex gap-2 my-5">
            <Link href="https://balqisjogja.com" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
              Kembali ke website Balqis
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <>
      <main className='py-3'>
        <header className='py-2 text-white bg-balqis'>
          <div className="container d-flex flex-wrap">
            <span>Kontak: 0878-7195-6868 / 0853-9999-0790</span>
          </div>
        </header>
        <nav className="py-3 mb-4 border-bottom">
          <div className="container d-flex flex-wrap justify-content-between align-items-center">
            <Link href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </Link>
            <ul className="nav">
              <li className="nav-item">
                <Link href="/info" className="nav-link link-body-emphasis px-2">INFORMASI</Link>
              </li>
              {status === 'authenticated' ? (
                <li className="nav-item">
                  <Button color="link" onClick={() => signOut()}>Sign Out</Button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/daftar" className="nav-link link-body-emphasis px-2">DAFTAR</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/masuk" className="nav-link link-body-emphasis px-2">LOGIN</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {children}
      </main>
      <footer className="py-3 bg-light container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </div>
            <div className="col-6 col-md">
              <h5>Alamat</h5>
              <ul className="list-unstyled text-small">
                <li>Jl. P. Mangkubumi, Karangijo Kulon</li>
                <li>Ponjong, Gunungkidul</li>
                <li>D.I Yogyakarta 55892</li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Kontak</h5>
              <ul className="list-unstyled text-small">
                <li>0878-7195-6868</li>
                <li>0853-9999-0790</li>
                <li>balqisjogja.com</li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Media Sosial</h5>
              <ul className="list-unstyled text-small">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Tiktok</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>  
  )
}