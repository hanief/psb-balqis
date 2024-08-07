import Tes from "@/components/Tes"
import { useContents } from "@/data/contents"
import { useRegistration } from "@/data/singleRegistration"
import { isAdmin } from "@/utils"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import { Alert, Button, Card, CardBody, Col, Container, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap"

export default function Status() {
  const { getKonten } = useContents()
  const [nik, setNik] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [didSearched, setDidSearched] = useState(false)
  const { registration, setRegistration, uploadBukti, getRegistrationsByNIK } = useRegistration()

  useEffect(() => {
    if (isAdmin()) {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    if (registrations?.length > 0) {
      setRegistration(registrations[0])
    } else {
      setRegistration(null)
    }
  }, [registrations])

  async function handleFindButtonPush() {
    setIsSearching(true)
    setDidSearched(false)

    const registrations = await getRegistrationsByNIK(nik)
    if (registrations?.length > 0) {
      setRegistrations(registrations)
    }

    setIsSearching(false)
    setDidSearched(true)
  }

  if (registration?.status_pendaftaran === 'diterima') {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Selamat!</h1>
            <Card>
              <CardBody>
              <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>
                {getKonten('status_diterima')}
              </ReactMarkdown>
                <p>Calon Santri atas nama {registration?.nama_lengkap} dan NIK {registration?.nik} telah diterima {registration?.syarat_penerimaan && (' dengan syarat')} di Pesantren Balqis Jogja</p>
                {registration?.syarat_penerimaan && (
                  <div>
                    <h5>Sebagai syarat penerimaan sebagai santri:</h5>
                    <p>{registration?.syarat_penerimaan}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  if (registration?.status_pendaftaran === 'ditolak') {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h2>Mohon maaf,</h2>
            <h1>Nama: {registration?.nama_lengkap}.</h1>
            <h1>NIK: {registration?.nik}.</h1>
            <Card>
              <CardBody>
              <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

                {getKonten('status_menunggu_konfirmasi')}
              </ReactMarkdown>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  if (registration?.pembayaran_diterima) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Terima kasih.</h1>
            <Tes registration={registration}/>
          </Col>
        </Row>
      </Container>
    )
  }

  if (registration?.bukti_pembayaran) {
    return (
      <Container>
      <Row>
        <Col>
          <h1 className="text-center">Terima kasih.</h1>
          <Card>
            <CardBody className="text-center">
              <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

                {getKonten('status_menunggu_konfirmasi')}
              </ReactMarkdown>
              </CardBody>
          </Card>
        </Col>
      </Row>
      </Container>
    )
  }

  if (registration) {
    return (
      <Container>
      <Row>
        <Col>
          <h1 className="text-center">Anda terdaftar, {registration?.nama_lengkap}</h1>
          <Card>
            <CardBody>
              <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

                {getKonten('status_menunggu_pembayaran')}
              </ReactMarkdown>
              <p className="card-text">
                Jika anda telah melakukan pembayaran, silakan upload bukti pembayaran melalui form berikut:
              </p>
              <FormGroup>
                <Input 
                  className='mb-1'
                  type="file"
                  id="bukti_pembayaran"
                  placeholder="Bukti Pembayaran"
                  accept="image/*,.pdf"
                  onChange={event => {
                    const file = event.target.files[0]
                    const type = 'pembayaran'
                    uploadBukti(file, type)
                  }}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Status Pendaftaran</h1>
          <Card>
            <CardBody>
              <p>Silakan masukkan NIK calon santri di bawah ini:</p>
              <FormGroup>
                <Label for="nik">NIK (Nomor Induk Kependudukan</Label>
                <Input
                  type="text"
                  name="nik"
                  value={nik}
                  invalid={!nik}
                  onChange={event => setNik(event.target.value)}
                />
                <FormFeedback>NIK harus diisi</FormFeedback>
              </FormGroup>
              <Button color="success" onClick={handleFindButtonPush}>
                {isSearching ? (<Spinner></Spinner>) : 'Cari'}
              </Button>
              {registrations?.length === 0 && didSearched && (
                <Alert className="my-2" color="warning">Maaf, kami tidak menemukan data calon santri dengan NIK tersebut. Silakan coba kembali</Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}