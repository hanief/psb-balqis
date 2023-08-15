import Login from '@/components/Login'
import Data from '@/components/Data'
import Bayar from '@/components/Bayar'
import dynamic from 'next/dynamic'
import { use, useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'reactstrap'
import Kartu from '@/components/Kartu'
import Tes from '@/components/Tes'
import Pengumuman from '@/components/Pengumuman'
import DaftarUlang from '@/components/DaftarUlang'
import Head from 'next/head'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRegistration } from '@/model/registration'

const StepperComponent = dynamic(() => import('@/components/CustomStepper'), {
  ssr: false,
})

export default function DaftarPage() {
  const {registration} = useRegistration()

  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [activeStep, setActiveStep] = useState(0)
  const progressStatus = [
    'data',
    'pembayaran',
    'tes',
    'pengumuman'
  ]
  const steps = useMemo(() => [
    {
      label: 'Isi Data',
      active: true,
      completed: activeStep > 0,
    },
    {
      label: 'Pembayaran',
      active: false,
      completed: activeStep > 1,
    },
    {
      label: 'Tes Masuk',
      active: false,
      completed: activeStep > 2,
    },
    {
      label: 'Pengumuman',
      active: false,
      completed: activeStep > 3,
    },
  ], [activeStep])

  useEffect(() => {
    if (registration && activeStep === 0) {
      setActiveStep(getProgressIndex())
    }
  }, [registration])

  function getProgressIndex() {
    if (!registration) return 0
    const index = progressStatus.findIndex(progress => progress === registration?.progress_status)

    return index < 0 ? 0 : index
  }

  if (!user) {
    return (
      <Container>
        <Head>
          <title>PSB Balqis Jogja - Pendaftaran</title>
          <meta name="description" content="Penerimaan Santri Baru BALQIS Jogja"/>
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
          <StepperComponent
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            isClickable={false}
          />
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-between my-2'>
          {activeStep > 0 && (
            <Button
              className="d-flex align-items-center"
              color="success"
              onClick={() => setActiveStep(activeStep - 1)}>
              <i className='bi bi-arrow-left'></i><span className='d-none d-md-block ms-1'>Kembali</span>
            </Button>
          )}
          <h2 className=''>{steps[activeStep]?.label}</h2>
          <Button
            className="d-flex align-items-center"
            color={activeStep > getProgressIndex() ? "secondary" : "success"}
            disabled={activeStep > getProgressIndex()}
            onClick={() => setActiveStep(activeStep + 1)}>
            <span className='d-none d-md-block me-1'>{activeStep === 0 && 'Simpan & '}Lanjutkan</span><i className='bi bi-arrow-right'></i>
          </Button>
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
