import Bayar from "@/components/Bayar"
import Tes from "@/components/Tes"
import { useContents } from "@/data/contents"
import { useRegistration } from "@/data/singleRegistration"
import { isAdmin } from "@/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Alert, Button, Card, CardBody, Col, Container, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap"

export default function Status() {
  const { getKonten } = useContents()
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [namaLengkap, setNamaLengkap] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [didSearched, setDidSearched] = useState(false)
  const { registration, setRegistration, uploadBukti, getRegistrationsByNameAndBirthdate } = useRegistration()

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

    const registrations = await getRegistrationsByNameAndBirthdate(namaLengkap, tanggalLahir)
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
              <ReactMarkdown>
                {getKonten('status_diterima')}
              </ReactMarkdown>
                <p>Calon Santri atas nama {registration?.nama_lengkap} telah diterima{registration?.syarat_penerimaan && (' dengan syarat')} di Pesantren Balqis Jogja</p>
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
            <h1>{registration?.nama_lengkap}.</h1>
            <Card>
              <CardBody>
              <ReactMarkdown>
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
              <ReactMarkdown>
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
              <ReactMarkdown>
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
              <p>Silakan masukkan nama lengkap dan tanggal lahir calon santri di bawah ini:</p>
              <FormGroup>
                <Label for="nama_lengkap">Nama lengkap</Label>
                <Input
                  type="text"
                  name="nama_lengkap"
                  value={namaLengkap}
                  invalid={!namaLengkap}
                  onChange={event => setNamaLengkap(event.target.value)}
                />
                <FormFeedback>Nama Lengkap harus diisi</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="tanggal_lahir">Tanggal Lahir</Label>
                <Input
                  type="date"
                  name="tanggal_lahir"
                  value={tanggalLahir}
                  invalid={!tanggalLahir}
                  onChange={event => setTanggalLahir(event.target.value)}
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      handleFindButtonPush()
                    }
                  }}
                />
                <FormFeedback>Tanggal Lahir harus diisi</FormFeedback>
              </FormGroup>
              <Button color="success" onClick={handleFindButtonPush}>
                {isSearching ? (<Spinner></Spinner>) : 'Cari'}
              </Button>
              {registrations?.length === 0 && didSearched && (
                <Alert className="my-2" color="warning">Maaf, kami tidak menemukan data calon santri dengan nama dan tanggal lahir tersebut. Silakan coba kembali</Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}