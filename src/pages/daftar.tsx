import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import Head from 'next/head'
import { useRegistration } from '@/data/singleRegistration'
import { columnsObject } from '@/data/columns'
import { isAdmin } from '@/utils'
import { useRouter } from 'next/router'
import { useSettings } from '@/data/settings'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const DataSantri = dynamic(() => import('@/components/DataSantri'), { ssr: false })
const DataJalur = dynamic(() => import('@/components/DataJalur'), { ssr: false })
const DataWali = dynamic(() => import('@/components/DataWali'), { ssr: false })
const Bayar = dynamic(() => import('@/components/Bayar'), { ssr: false })

export default function DaftarPage() {
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const {settings} = useSettings()

  useEffect(() => {
    if (isAdmin()) {
      router.push('/')
    }

    if (!user) {
      login()
    }
  }, [])

  const {
    create,
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

  async function login() {
    const creds = {
      email: 'pendaftar@utama.app',
      password: 'p3nd4ft4R!'
    }

    const { error } = await supabase
      .auth
      .signInWithPassword(creds)

    if (error) {
      await supabase
        .auth
        .signUp(creds)
    }
  }

  function isNextButtonDisabled() {
    return activeStep >= steps.length - 1 || !isDataFormValid
  }

  async function handleNextButtonPush() {
    setActiveStep(activeStep + 1)

    if (activeStep === 3) {
      await create(localRegistration)
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
    const data = await uploadBukti(file, type)
    const newRegistrationData = {
      ...localRegistration,
      ...data
    }

    setLocalRegistration(newRegistrationData)
    update(data)
  }
  
  async function handleDeleteBukti(file) {
    const data = await deleteBukti(file)
    const newRegistrationData = {
      ...localRegistration,
      ...data
    }

    setLocalRegistration(newRegistrationData)
    update(data)
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
          <Card>
            <CardBody>
              <h1 className='text-center mt-auto'>Pendaftaran belum dibuka</h1>
              <p className='text-center mb-auto'>Mohon maaf, kami belum membuka pendaftaran santri baru pada periode ini. Silakan coba kembali di lain kesempatan.</p>
            </CardBody>
          </Card>
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
            registration={localRegistration}
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
