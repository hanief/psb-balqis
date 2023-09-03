import { Button, Card, CardBody, FormGroup, Input, Label, Spinner } from "reactstrap";
import Link from "next/link";

export default function Bayar({ registration, onUploadBukti }) {  
  if (registration?.pembayaran_diterima) {
    return (
      <Card>
        <CardBody className="text-center">
          <h2 className="display-3">Terima kasih.</h2>
          <p>Kami telah menerima bukti pembayaran yang anda unggah.</p>
        </CardBody>
      </Card>
    )
  }

  if (registration?.bukti_pembayaran) {
    return (
      <Card>
        <CardBody className="text-center">
          <h2 className="display-3">Terima kasih.</h2>
          <p>Kami telah menerima bukti pembayaran dan mencatat pendaftaran atas nama <strong>{registration?.nama_lengkap}</strong>.</p>
          <p>Selanjutnya, Panitia PSB akan melakukan konfirmasi atas pembayaran yang anda lakukan.</p>
          <br />
          <p>Anda dapat melihat status pendaftaran setiap saat dengan mengunjungi halaman:</p>
          <Link className="btn btn-balqis" href={'/status'}>Cek Status Pendaftaran</Link>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <p>Selanjutnya, mohon melakukan pembayaran biaya pendaftaran sebesar <strong>Rp. 250.000</strong> ke rekening berikut:</p>
        <ul className="list-unstyled border border-success rounded p-2">
          <li><strong>Bank Syariah Indonesia (BSI)</strong></li>
          <li><strong><em>Nomor 7088404267</em></strong></li>
          <li><em>Yayasan Baitul Qur&apos;an Yogyakarta</em></li>
        </ul>
        <p className="card-text">
          Setelah melakukan pembayaran, mohon upload bukti pembayaran melalui form berikut:
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
              onUploadBukti(file, type)
            }}
          />
        </FormGroup>
      </CardBody>
    </Card>
  )
}