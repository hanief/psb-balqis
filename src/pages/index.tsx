import { Col, Container, Row } from 'reactstrap'
import Link from 'next/link'
import Head from 'next/head'
import { isAdmin } from '@/utils/utils'
import { useUser } from '@supabase/auth-helpers-react'
import dynamic from 'next/dynamic'
import { useContents } from '@/data/contents'
import { useSettings } from '@/data/settings'
import { Fragment } from 'react'

const Dasbor = dynamic(() => import('@/components/Dasbor'), { ssr: false })
const AdminLogin = dynamic(() => import('@/components/AdminLogin'), { ssr: false })
const Info = dynamic(() => import('@/components/Info'), { ssr: false })
const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

export default function Home() {
  const user = useUser()
  const { getKonten } = useContents()
  const { settings } = useSettings()

  if (isAdmin()) {
    return (
      <Fragment>
        {user ? (
          <Dasbor />
        ) : (
          <Row className='justify-content-center mt-5'>
            <Col sm="4">
              <AdminLogin />
            </Col>
          </Row>
        )}
      </Fragment>
    )
  }

  return (
    <>
      <Head>
          <title>Penerimaan Santri Baru BALQIS Jogja - Beranda</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
      </Head>
      <Carousel />
      <Info />
    </>
  )
}
