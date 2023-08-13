import { Container } from 'reactstrap'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <Container className="container my-5">
      <Head>
        <title>PSB Balqis Jogja - Beranda</title>
      </Head>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Penerimaan Santri Baru</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Penerimaan santri baru Balqis Jogja tahun ajaran 2023/2024 telah dibuka. Silahkan daftarkan diri anda sekarang.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <Link href="/daftar" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4">
            Daftar Sekarang
          </Link>
          <Link href="/info" className="btn btn-outline-secondary btn-lg px-4" type="button">
            Lihat Informasi
          </Link>
        </div>
      </div>
    </Container>
  )
}
