import { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const {data: session, status} = useSession()

  return (
    <Container className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Pendaftaran Siswa Baru</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Pendaftaran siswa baru Balqis Jogja tahun ajaran 2023/2024 telah dibuka. Silahkan daftarkan diri anda sekarang.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <Link href="/daftar" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
            Daftar Sekarang
          </Link>
          <Link href="/info" className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
            Lihat Informasi
          </Link>
        </div>
      </div>
    </Container>
  )
}
