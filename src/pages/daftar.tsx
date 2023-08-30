import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useUser } from '@supabase/auth-helpers-react'
import { useSingleRegistration } from '@/data/singleRegistration'
import Login from '@/components/Login'
import { useProfile } from '@/data/profiles'
import { useRouter } from 'next/router'

const Data = dynamic(() => import('@/components/Data'), { ssr: false })
const DataSantri = dynamic(() => import('@/components/DataSantri'), { ssr: false })
const DataJalur = dynamic(() => import('@/components/DataJalur'), { ssr: false })
const DataWali = dynamic(() => import('@/components/DataWali'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })
const Tes = dynamic(() => import('@/components/Tes'), { ssr: false })
const Pengumuman = dynamic(() => import('@/components/Pengumuman'), { ssr: false })
const Stepper = dynamic(() => import('@/components/CustomStepper'), { ssr: false })

export default function DaftarPage() {
  const router = useRouter()
  const { user, profile } = useProfile()
  const {registration} = useSingleRegistration(user?.id)
  const [activeStep, setActiveStep] = useState(getProgressIndex())
  const [isDataFormValid, setIsDataFormValid] = useState(false)

  const steps = useMemo(() => [
    {
      label: 'Data Santri',
      slug: 'santri',
      active: true,
      completed: activeStep > 0,
    },    
    {
      label: 'Jalur Pendaftaran',
      slug: 'jalur',
      active: false,
      completed: activeStep > 1,
    }, 
    {
      label: 'Data Wali',
      slug: 'wali',
      active: false,
      completed: activeStep > 2,
    },
    {
      label: 'Pembayaran',
      slug: 'pembayaran',
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
    if (registration.pembayaran_diterima) return 3
    
    return 0
  }

  function isNextButtonDisabled() {
    return activeStep >= steps.length - 1

    if (activeStep === 0) return !isDataFormValid
    
    return true
  }

  return (
    <Container>
      <Head>
        <title>PSB Balqis Jogja - Pendaftaran</title>
        <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
      </Head>
      <Row>
        <Col className='d-flex justify-content-between my-2'>
          {activeStep > 0 && (
            <Button
              className="d-flex align-items-center"
              color="success"
              onClick={() => setActiveStep(activeStep - 1)}>
              <i className='bi bi-chevron-left'></i><span className='d-none d-md-block ms-1'>Kembali</span>
            </Button>
          )}
          <h2 className=''>{steps[activeStep]?.label}</h2>
          <Button
            className="d-flex align-items-center"
            color={isNextButtonDisabled() ? "secondary" : "success"}
            disabled={isNextButtonDisabled() }
            onClick={() => setActiveStep(activeStep + 1)}>
            <span className='me-1'>Lanjutkan</span><i className='bi bi-chevron-right'></i>
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
        <Col>
        {activeStep === 0 && (
          <DataSantri onValidityChange={setIsDataFormValid}/>
        )}
        {activeStep === 1 && (
          <DataJalur onValidityChange={setIsDataFormValid}/>
        )}
        {activeStep === 2 && (
          <DataWali onValidityChange={setIsDataFormValid}/>
        )}
        {activeStep === 3 && (
          <Bayar />
        )}
        </Col>
      </Row>
    </Container>
  )
}
