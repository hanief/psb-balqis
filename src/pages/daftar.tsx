import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
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
  const user = useUser()
  const supabase = useSupabaseClient()
  const {registration} = useSingleRegistration(user?.id)
  const [activeStep, setActiveStep] = useState(getProgressIndex())
  const [isDataFormValid, setIsDataFormValid] = useState(false)

  useEffect(() => {
    if (!user) {
      supabase.auth.signUp({
        email: `${Date.now()}@utama.app`,
        password: `${Date.now()}!`
      })
    }
  }, [user])

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

  function getProgressIndex() {
    if (!registration) return 0
    if (registration.pembayaran_diterima) return 3
    
    return 0
  }

  function isNextButtonDisabled() {
    return activeStep >= steps.length - 1 || !isDataFormValid
  }

  return (
    <Container>
      <Head>
        <title>PSB Balqis Jogja - Pendaftaran</title>
        <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
      </Head>
      <Row>
        <Col className='d-flex justify-content-between my-2'>
          <Button
            className="d-flex align-items-center"
            color={activeStep === 0 ? "secondary" : "success"}
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}>
            <i className='bi bi-chevron-left'></i><span className='ms-1'>Kembali</span>
          </Button>
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
