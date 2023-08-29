import Data from '@/components/Data'
import Bayar from '@/components/Bayar'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Tes from '@/components/Tes'
import Pengumuman from '@/components/Pengumuman'
import Head from 'next/head'
import { useRegistration } from '@/data/registration'

const StepperComponent = dynamic(() => import('@/components/CustomStepper'), {
  ssr: false,
})

export default function DaftarPage() {
  const {registration, isLoading} = useRegistration()
  const [activeStep, setActiveStep] = useState(getProgressIndex())

  const steps = useMemo(() => [
    {
      label: 'Isi Data',
      slug: 'data',
      active: true,
      completed: activeStep > 0,
    },
    {
      label: 'Pembayaran',
      slug: 'pembayaran',
      active: false,
      completed: activeStep > 1,
    },
    {
      label: 'Tes Masuk',
      slug: 'tes',
      active: false,
      completed: activeStep > 2,
    },
    {
      label: 'Pengumuman',
      slug: 'pengumuman',
      active: false,
      completed: activeStep > 3,
    },
  ], [activeStep])

  useEffect(() => {
    if (activeStep === 0) return
    
    setActiveStep(getProgressIndex())
  }, [registration])

  function getProgressIndex() {
    if (!registration) return 0
    if (registration.pembayaran_diterima) return 2
    if (registration.bukti_pembayaran) return 1
    
    return 0
  }

  function isNextButtonDisabled() {
    if (activeStep === 0) return false
    if (activeStep === 1) return !registration?.pembayaran_diterima
    
    return true
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
            color={isNextButtonDisabled() ? "secondary" : "success"}
            disabled={isNextButtonDisabled() }
            onClick={() => setActiveStep(activeStep + 1)}>
            <span className='me-1'>{activeStep === 0 ? 'Kirim' : 'Lanjutkan'}</span><i className='bi bi-arrow-right'></i>
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
        <Col>
        {activeStep === 0 && (
          <Data />
        )}
        {activeStep === 1 && (
          <Bayar />
        )}
        {activeStep === 2 && (
          <Tes />
        )}
        {activeStep === 3 && (
          <Pengumuman />
        )}
        </Col>
      </Row>
    </Container>
  )
}
