import Login from '@/components/Login'
import Data from '@/components/Data'
import Bayar from '@/components/Bayar'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useSession } from 'next-auth/react'
import Kartu from '@/components/Kartu'
import Tes from '@/components/Tes'
import Pengumuman from '@/components/Pengumuman'
import DaftarUlang from '@/components/DaftarUlang'

const StepperComponent = dynamic(() => import('@/components/CustomStepper'), {
  ssr: false,
})

export default function DaftarPage() {
  const {data: session, status} = useSession()
  
  const [steps, setSteps] = useState([
    {
      label: 'Masuk',
      active: true,
      completed: false,
    },
    {
      label: 'Isi Data',
      active: false,
      completed: false,
    },
    {
      label: 'Bayar Biaya',
      active: false,
      completed: false,
    },
    {
      label: 'Cetak Kartu',
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
  const [activeStep, setActiveStep] = useState(status === 'authenticated' ? 1 : 0)

  return (
    <Container>
      <Row>
        <Col>
          <StepperComponent activeStep={activeStep} steps={steps}/>
        </Col>
      </Row>
      <Row className='justify-content-center mb-6'>
          {activeStep === 0 && (
            <Col sm="4">
              <Login onSuccess={() => setActiveStep(1)}/>
            </Col>
          )}
          {activeStep === 1 && (
            <Col sm="6">
              <Data onSuccess={() => setActiveStep(2)}/>
            </Col>
          )}
          {activeStep === 2 && (
            <Col sm="4">
              <Bayar onSuccess={() => setActiveStep(3)}/>
            </Col>
          )}
          {activeStep === 3 && (
            <Col sm="4">
              <Kartu onSuccess={() => setActiveStep(4)}/>
            </Col>
          )}
          {activeStep === 4 && (
            <Col sm="4">
              <Tes onSuccess={() => setActiveStep(5)}/>
            </Col>
          )}
          {activeStep === 5 && (
            <Col sm="4">
              <Pengumuman onSuccess={() => setActiveStep(6)} />
            </Col>
          )}
          {activeStep === 6 && (
            <Col sm="4">
              <DaftarUlang onSuccess={() => setActiveStep(7)} />
            </Col>
          )}
      </Row>
    </Container>
  )
}
