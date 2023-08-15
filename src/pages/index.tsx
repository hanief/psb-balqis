import { Col, Container, Row } from 'reactstrap'
import Link from 'next/link'
import Head from 'next/head'
import Carousel from '@/components/Carousel'
import Info from '@/components/Info'

export default function Home() {
  return (
    <Container className="container my-5">
      <Head>
          <title>Penerimaan Santri Baru BALQIS Jogja - Beranda</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
      </Head>
      <Row>
        <Col>
          <Carousel></Carousel>
        </Col>
        <Col md="6" lg="4">
          <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">Penerimaan Santri Baru</h1>
            <p className="col-lg-8 mx-auto fs-5 text-muted">
              BALQIS Jogja siap menerima pendaftaran untuk tahun ajaran 2024/2025. Silakan klik tombol di bawah.
            </p>
            <div className="d-inline-flex gap-2 mb-5">
              <Link href="/daftar" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4">
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Info></Info>
    </Container>
  )
}
