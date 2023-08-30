import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useUser } from '@supabase/auth-helpers-react'
import { useSingleRegistration } from '@/data/singleRegistration'
import Login from '@/components/Login'

const Data = dynamic(() => import('@/components/Data'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })
const Tes = dynamic(() => import('@/components/Tes'), { ssr: false })
const Pengumuman = dynamic(() => import('@/components/Pengumuman'), { ssr: false })
const Stepper = dynamic(() => import('@/components/CustomStepper'), { ssr: false })

export default function DaftarPage() {
  const user = useUser()
  const {registration} = useSingleRegistration(user?.id)
  const [activeStep, setActiveStep] = useState(getProgressIndex())
  const [isDataFormValid, setIsDataFormValid] = useState(false)

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
    if (activeStep === 0) return !isDataFormValid
    if (activeStep === 1) return !registration?.pembayaran_diterima
    
    return true
  }

  if (!user) {
    return (
      <Container>
        <Head>
          <title>PSB Balqis Jogja - Pendaftaran</title>
          <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
        </Head>
        <Row className='justify-content-center mb-6'>
            <Col sm="6">
            <h1>Masuk</h1>
            <Login />
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
          <Stepper
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
          <Data onValidityChange={setIsDataFormValid}/>
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
