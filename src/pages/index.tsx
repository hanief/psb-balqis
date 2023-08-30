import { Col, Container, Row } from 'reactstrap'
import Link from 'next/link'
import Head from 'next/head'
import { isAdmin } from '@/utils'
import { useUser } from '@supabase/auth-helpers-react'
import dynamic from 'next/dynamic'

const Dasbor = dynamic(() => import('@/components/Dasbor'), { ssr: false })
const AdminLogin = dynamic(() => import('@/components/AdminLogin'), { ssr: false })
const Info = dynamic(() => import('@/components/Info'), { ssr: false })
const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

export default function Home() {
  const user = useUser()
  
  if (isAdmin()) {
    return (
      <Container className='my-5'>
        <Head>
          <title>PSB Balqis Jogja - Pendaftaran</title>
          <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
        </Head>
        {user ? (
          <Dasbor />
        ) : (
          <Row className='justify-content-center mb-6'>
            <Col sm="6">
              <AdminLogin />
            </Col>
          </Row>
        )}
      </Container>
    )
  }

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
              BALQIS Jogja siap menerima pendaftaran untuk tahun ajaran 2024/2025.
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
