import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useRegistration } from '@/data/singleRegistration'
import { columnsObject } from '@/data/columns'
import { isAdmin } from '@/utils'
import { useRouter } from 'next/router'
import { useSettings } from '@/data/settings'

const DataSantri = dynamic(() => import('@/components/DataSantri'), { ssr: false })
const DataJalur = dynamic(() => import('@/components/DataJalur'), { ssr: false })
const DataWali = dynamic(() => import('@/components/DataWali'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })

export default function DaftarPage() {
  const router = useRouter()
  const {settings} = useSettings()

  useEffect(() => {
    if (isAdmin()) {
      router.push('/')
    }
  }, [])

  const { 
    registration, 
    create, 
    change, 
    changeMultiple, 
    update,
    uploadBukti, 
    downloadBukti, 
    deleteBukti 
  } = useRegistration()
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
    const newData = {
      ...localRegistration,
      ...dataChanges
    }

    setLocalRegistration(newData)
  }

  function handleMultipleChanges(changes) {
    const newRegistration = {...localRegistration}

    changes.forEach(({ key, value }) => {
      newRegistration[key] = value
    })

    setLocalRegistration(newRegistration)
  }

  async function handleUploadBukti(file, type) {
    if (registration?.id) {
      await update(localRegistration)
    }

    const data = await uploadBukti(file, type)

    setLocalRegistration(data)
  }
  
  async function handleDeleteBukti(file) {
    if (registration?.id) {
      await update(localRegistration)
    }

    const data = await deleteBukti(file)
    
    setLocalRegistration(data)
  }

  if (settings?.pendaftaran_buka === 'false') {
    return (
      <Container className='my-2'>
        <Head>
          <title>PSB Balqis Jogja - Pendaftaran</title>
          <meta name="description" content="Penerimaan Santri Baru Balqis Jogja"/>
        </Head>
        <Row>
          <Col>
            <h1 className='text-center'>Pendaftaran belum dibuka</h1>
            <p className='text-center'>Mohon maaf, kami belum membuka pendaftaran santri baru pada periode ini. Silakan coba kembali di lain kesempatan.</p>
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
        <Col className={`d-flex justify-content-between align-items-center my-2`}>
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
            onChangeMultiple={handleMultipleChanges}
            onUploadBukti={handleUploadBukti}
            onDownloadBukti={downloadBukti}
            onDeleteBukti={handleDeleteBukti}
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
            onUploadBukti={handleUploadBukti}
          />
        )}
        </Col>
      </Row>
      <Row>
        <Col className={`d-flex justify-content-between align-items-center my-2`}>
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
    </Container>
  )
}
