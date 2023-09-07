import { Col, Container, Row } from 'reactstrap'
import Link from 'next/link'
import Head from 'next/head'
import { isAdmin } from '@/utils'
import { useUser } from '@supabase/auth-helpers-react'
import dynamic from 'next/dynamic'
import { useContents } from '@/data/contents'

const Dasbor = dynamic(() => import('@/components/Dasbor'), { ssr: false })
const AdminLogin = dynamic(() => import('@/components/AdminLogin'), { ssr: false })
const Info = dynamic(() => import('@/components/Info'), { ssr: false })
const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

export default function Home() {
  const user = useUser()
  const { contents } = useContents()

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
      <Row className='gap-2'>
        <Col className='order-2 order-md-1'>
          <Carousel />
        </Col>
        <Col md="6" lg="4" className='order-1 order-md-2'>
          <div className="bg-success-subtle bg-gradient rounded">
            <div className="p-5 text-center">
              <h1 className="text-body-emphasis display-5">Penerimaan Santri Baru</h1>
              <p className="col-lg-8 mx-auto fs-5 text-muted">
                SMPIT-SMAIT Baitul Qur&apos;an Islamic School (BALQIS) Yogyakarta Tahun Pelajaran 2024/2025.
              </p>
              <div className="d-grid gap-2">
                <Link href="/daftar" className="btn btn-balqis btn-lg px-4">
                  Daftar Sekarang
                </Link>
                <Link href="/status" className="btn btn-success btn-lg px-4">
                  Cek Status Pendaftaran
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Info />
    </Container>
  )
}
