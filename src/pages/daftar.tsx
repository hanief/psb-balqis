import Login from '@/components/Login'
import Data from '@/components/Data'
import Bayar from '@/components/Bayar'
import dynamic from 'next/dynamic'
import { use, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Kartu from '@/components/Kartu'
import Tes from '@/components/Tes'
import Pengumuman from '@/components/Pengumuman'
import DaftarUlang from '@/components/DaftarUlang'
import type { Metadata } from 'next'
import Head from 'next/head'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export const metadata: Metadata = {
  title: 'PSB Balqis',
  description: 'Penerimaan Santri Baru Balqis',
}

const StepperComponent = dynamic(() => import('@/components/CustomStepper'), {
  ssr: false,
})

export default function DaftarPage() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  
  const [steps, setSteps] = useState([
    {
      label: 'Isi Data',
      active: true,
      completed: false,
    },
    {
      label: 'Pembayaran',
      active: false,
      completed: false,
    },
    {
      label: 'Tes Masuk',
      active: false,
      completed: false,
    },
    {
      label: 'Pengumuman',
      active: false,
      completed: false,
    },
    {
      label: 'Daftar Ulang',
      active: false,
      completed: false,
    },
  ])
  const [activeStep, setActiveStep] = useState(0)

  if (!user) {
    return (
      <Container>
        <Head>
          <title>PSB Balqis Jogja - Pendaftaran</title>
          <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
        </Head>
        <Row className='justify-content-center mb-6'>
          <Col sm="6">
            <Login onSuccess={() => console.log('login success')}></Login>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Head>
        <title>PSB Balqis Jogja - Pendaftaran</title>
        <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
      </Head>
      <Row>
        <Col>
          <StepperComponent activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
        {activeStep === 0 && (
          <Data onSuccess={() => setActiveStep(1)}/>
        )}
        {activeStep === 1 && (
          <Col>
            <Bayar onSuccess={() => setActiveStep(2)}/>
          </Col>
        )}
        {activeStep === 2 && (
          <Col sm="6">
            <Tes onSuccess={() => setActiveStep(3)}/>
          </Col>
        )}
        {activeStep === 3 && (
          <Col sm="6">
            <Pengumuman onSuccess={() => setActiveStep(4)} />
          </Col>
        )}
        {activeStep === 4 && (
          <Col sm="6">
            <DaftarUlang onSuccess={() => setActiveStep(5)} />
          </Col>
        )}
      </Row>
    </Container>
  )
}
