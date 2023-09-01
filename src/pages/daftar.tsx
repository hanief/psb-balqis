import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useSingleRegistration } from '@/data/singleRegistration'
import { columnsObject } from '@/data/columns'
import { useProfile } from '@/data/profiles'

const DataSantri = dynamic(() => import('@/components/DataSantri'), { ssr: false })
const DataJalur = dynamic(() => import('@/components/DataJalur'), { ssr: false })
const DataWali = dynamic(() => import('@/components/DataWali'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })

export default function DaftarPage() {
  const { user, create } = useProfile()
  const { registration } = useSingleRegistration(user?.id)
  const [activeStep, setActiveStep] = useState(getProgressIndex())
  const [isDataFormValid, setIsDataFormValid] = useState(false)
  const [localRegistration, setLocalRegistration] = useState(columnsObject)

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
    if (registration?.pembayaran_diterima) return 3
    
    return 0
  }

  function isNextButtonDisabled() {
    return activeStep >= steps.length - 1 || !isDataFormValid
  }

  function handlePreviousButtonPush() {
    setActiveStep(activeStep - 1)
  }

  async function handleNextButtonPush() {
    if (activeStep >= steps.length - 1) return

    if (activeStep === 0 && !registration && !user) {
      await create(localRegistration)
    }

    setActiveStep(activeStep + 1)
  }

  return (
    <Container>
      <Head>
        <title>PSB Balqis Jogja - Pendaftaran</title>
        <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
      </Head>
      <Row>
        <Col className={`d-flex justify-content-${activeStep > 0 ? 'between' : 'end'} my-2`}>
          {activeStep > 0 && (
            <Button
              className="d-flex align-items-center"
              color={activeStep === 0 ? "secondary" : "success"}
              disabled={activeStep === 0}
              onClick={handlePreviousButtonPush}>
              <i className='bi bi-chevron-left'></i><span className='ms-1'>Kembali</span>
            </Button>
          )}
          <Button
            className="d-flex align-items-center"
            color={isNextButtonDisabled() ? "secondary" : "success"}
            disabled={isNextButtonDisabled() }
            onClick={handleNextButtonPush}>
            <span className='me-1'>Lanjutkan</span><i className='bi bi-chevron-right'></i>
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
        <Col>
        {activeStep === 0 && (
          <DataSantri onValidityChange={setIsDataFormValid} onDataChange={setLocalRegistration}/>
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
