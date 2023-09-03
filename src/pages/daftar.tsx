import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useRegistration } from '@/data/singleRegistration'
import { columnsObject } from '@/data/columns'
import { isAdmin } from '@/utils'
import { useRouter } from 'next/router'

const DataSantri = dynamic(() => import('@/components/DataSantri'), { ssr: false })
const DataJalur = dynamic(() => import('@/components/DataJalur'), { ssr: false })
const DataWali = dynamic(() => import('@/components/DataWali'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })

export default function DaftarPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAdmin()) {
      router.push('/')
    }
  }, [])

  const { registration, create, update, uploadBukti, downloadBukti, deleteBukti } = useRegistration(columnsObject)
  const [activeStep, setActiveStep] = useState(0)
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

  function isNextButtonDisabled() {
    return activeStep >= steps.length - 1 || !isDataFormValid
  }

  async function handlePreviousButtonPush() {
    setActiveStep(activeStep - 1)

    if (activeStep < 3 && registration?.id) {
      await update(localRegistration)
    }
  }

  async function handleNextButtonPush() {
    if (activeStep >= steps.length - 1) return

    setActiveStep(activeStep + 1)

    if (activeStep === 0 && !registration?.id) {
      await create(localRegistration)
    } else if (registration?.id) {
      await update(localRegistration)
    }
  }

  function handleChange(name, value) {
    const dataChanges = {
      [name]: value
    }

    setLocalRegistration({
      ...localRegistration,
      ...dataChanges
    })
  }

  function handleMultipleChanges(changes) {
    const newRegistration = {}

    changes.forEach(({ key, value }) => {
      newRegistration[key] = value
    })

    setLocalRegistration({
      ...localRegistration,
      ...newRegistration
    })
  }

  return (
    <Container>
      <Head>
        <title>PSB Balqis Jogja - Pendaftaran</title>
        <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
      </Head>
      <Row>
        <Col className={`d-flex justify-content-between align-items-center my-2`}>
          {/* {activeStep > 0 && (
            <Button
              className="d-flex align-items-center me-auto"
              color={activeStep === 0 ? "secondary" : "success"}
              disabled={activeStep === 0}
              onClick={handlePreviousButtonPush}>
              <i className='bi bi-chevron-left'></i><span className='ms-1'>Kembali</span>
            </Button>
          )} */}
          {activeStep < 3 && (
            <Button
              className="d-flex align-items-center ms-auto"
              color={isNextButtonDisabled() ? "secondary" : "success"}
              disabled={isNextButtonDisabled() }
              onClick={handleNextButtonPush}>
              <span className='me-1'>Lanjutkan</span><i className='bi bi-chevron-right'></i>
            </Button>
          )}
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
        <Col>
        {activeStep === 0 && (
          <DataSantri
            registration={localRegistration}
            onValidityChange={setIsDataFormValid} 
            onChange={handleChange}
          />
        )}
        {activeStep === 1 && (
          <DataJalur 
            registration={localRegistration}
            onChange={handleChange}
            onUploadBukti={uploadBukti}
            onDownloadBukti={downloadBukti}
            onDeleteBukti={deleteBukti}
            onValidityChange={setIsDataFormValid}
          />
        )}
        {activeStep === 2 && (
          <DataWali 
            registration={localRegistration}
            onChange={handleChange}
            onChangeMultiple={handleMultipleChanges}
            onValidityChange={setIsDataFormValid}
          />
        )}
        {activeStep === 3 && (
          <Bayar 
            registration={registration}
            onUploadBukti={uploadBukti}
            onDeleteBukti={deleteBukti}
          />
        )}
        </Col>
      </Row>
    </Container>
  )
}
