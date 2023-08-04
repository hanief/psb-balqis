import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Button } from 'reactstrap'

export default function Layout({children}) {
  const {data: session, status} = useSession()
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
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
              <Image src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            </a>
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
                <li><a className="link-secondary text-decoration-none" href="#">0878-7195-6868</a></li>
                <li><a className="link-secondary text-decoration-none" href="#">0853-9999-0790</a></li>
                <li><a className="link-secondary text-decoration-none" href="#">balqisjogja.com</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Media Sosial</h5>
              <ul className="list-unstyled text-small">
                <li><a className="link-secondary text-decoration-none" href="#">Instagram</a></li>
                <li><a className="link-secondary text-decoration-none" href="#">Facebook</a></li>
                <li><a className="link-secondary text-decoration-none" href="#">Tiktok</a></li>
                <li><a className="link-secondary text-decoration-none" href="#">Youtube</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>  
  )
}