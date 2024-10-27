import Tes from "@/components/Tes"
import { useContents } from "@/data/contents"
import { useRegistration } from "@/data/singleRegistration"
import { isAdmin } from "@/utils/utils"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import { Alert, Button, Card, CardBody, Col, Container, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap"
import NextImage from 'next/image'
import { toPng } from "html-to-image"
import {DateTime} from 'luxon'
import Link from "next/link"
import { useRouter } from "next/router"
import { jenjangOptions } from "@/data/options"

export default function Status() {
  const router = useRouter()
  const { getKonten } = useContents()
  const [nik, setNik] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [didSearched, setDidSearched] = useState(false)
  const { registration, setRegistration, getRegistrationsByNIK } = useRegistration()

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

  function downloadKartu() {
    const node = document.getElementById('kartu')
    toPng(node, {
      backgroundColor: 'green',
    }).then(function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;

      const element = document.createElement("a");
      element.href = dataUrl;
      element.download = `Kartu Pendaftaran ${registration?.nama_lengkap}.png`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    })
  }

  function getNamaSekolah() {
    const jenjang = jenjangOptions.find(j => j.value === registration?.jenjang)

    if (jenjang) {
      return jenjang.label
    }

    return 'Pesantren BALQIS Yogyakarta'
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
                {getKonten('status_ditolak')}
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
      <Card>
        <CardBody>
          <h1 className="text-center"><strong>Selamat</strong>, {registration.nama_lengkap} telah terdaftar di {getNamaSekolah()}.</h1>
          <p className="text-center">Silakan menyimpan kartu pendaftaran di bawah ini:</p>
          <div style={{width: '330px'}} className="mb-2 mx-auto">
            <Button block className="my-2" color="primary" onClick={() => downloadKartu()}><i className="bi-download me-1"></i>Simpan</Button>
            <Card id="kartu" >
              <CardBody>
                <div className="text-center my-2 bg-white rounded">
                  <NextImage className="mt-1 mb-3" src="/balqis-logo.png" width="180" height="52" alt="Logo Balqis" />
                  <h3 className="mb-4"><strong>Kartu Pendaftaran Santri Baru</strong></h3>
                </div>
                <div className="my-2 bg-success rounded">
                  <table className="table table-success">
                    <tbody>
                      <tr>
                        <th scope="row">Nama:</th>
                        <td>{registration?.nama_lengkap}</td>
                      </tr>
                      <tr>
                        <th scope="row">NIK:</th>
                        <td>{registration.nik}</td>
                      </tr>
                      <tr>
                        <th scope="row">Jenis Kelamin:</th>
                        <td>{registration?.jenis_kelamin === 'laki-laki' ? 'Laki-laki' : 'Perempuan'}</td>
                      </tr>
                      <tr>
                        <th scope="row">Jenjang:</th>
                        {registration?.jenjang === 'sd' && <td>SD Baitul Quran Ponjong</td>}
                        {registration?.jenjang === 'smp' && <td>SMP Baitul Quran Ponjong</td>}
                        {registration?.jenjang === 'sma' && <td>SMA Baitul Quran Yogyakarta</td>}
                      </tr>
                      <tr>
                        <th scope="row">Tempat Tanggal Lahir:</th>
                        <td>{registration?.tempat_lahir || '-'}{registration?.tanggal_lahir ? ', ' + DateTime.fromISO(registration?.tanggal_lahir).toLocaleString(DateTime.DATE_MED) : ''}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pendaftaran:</th>
                        <td>{DateTime.now().toLocaleString(DateTime.DATE_MED)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
          <p>Selanjutnya, silakan membayar biaya pendaftaran sebesar <strong>Rp. 250.000</strong> ke rekening:</p>
          <ul className="list-unstyled border border-success rounded p-2">
            <li><strong>Bank Syariah Indonesia (BSI)</strong></li>
            <li><strong><em>Nomor 7088404267</em></strong></li>
            <li><em>Yayasan Baitul Qur&apos;an Yogyakarta</em></li>
          </ul>
          <p className="card-text">
            Setelah melakukan pembayaran, kirim bukti pembayaran via Whatsapp ke nomor <Link className='link-secondary no-underline' href={`https://wa.me/${router.query.jenjang === 'sd' ? '+6287871956868' : '+6287871956868'}`}><strong>{router.query.jenjang === 'sd' ? '0‪87762007766‬' : '087871956868'}</strong></Link>.
          </p>
          <p>Anda dapat melihat status pendaftaran setiap saat dengan mengunjungi halaman di bawah ini:</p>
          <Link className="btn btn-balqis" href={'/status'}>Cek Status Pendaftaran</Link>
        </CardBody>
      </Card>
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
                <Label for="nik">NIK (Nomor Induk Kependudukan)</Label>
                <Input
                  type="text"
                  name="nik"
                  value={nik}
                  invalid={!nik}
                  placeholder="contoh: 312312341234134234"
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