import { Button, Card, CardBody, FormGroup, Input } from "reactstrap";
import Link from "next/link";
import { useContents } from "@/data/contents";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import { useRouter } from "next/router"
import {DateTime} from 'luxon'
import NextImage from 'next/image'
import { toPng } from 'html-to-image'

export default function Bayar({ registration, onUploadBukti }) { 
  const router = useRouter() 
  const { getKonten } = useContents()
  
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

  if (registration?.pembayaran_diterima) {
    return (
      <Card>
        <CardBody className="text-center">
          <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

            {getKonten('bayar_pembayaran_konfirmasi')}
          </ReactMarkdown>
        </CardBody>
      </Card>
    )
  }

  if (registration?.bukti_pembayaran) {
    return (
      <Card>
        <CardBody className="text-center">
          <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

            {getKonten('bayar_bukti_diupload')}
          </ReactMarkdown>
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
        <h1 className="text-center"><strong>Selamat</strong>, {registration.nama_lengkap} telah terdaftar di {registration.jenjang?.toUpperCase()} BALQIS.</h1>
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
          Setelah melakukan pembayaran, kirim bukti pembayaran via Whatsapp ke nomor <Link className='link-secondary no-underline' href={`https://wa.me/${router.query.jenjang === 'sd' ? '+6287871956868' : '+6287871956868'}`}><strong>{router.query.jenjang === 'sd' ? '081228594844' : '087871956868'}</strong></Link>.
        </p>
        <p>Anda dapat melihat status pendaftaran setiap saat dengan mengunjungi halaman di bawah ini:</p>
        <Link className="btn btn-balqis" href={'/status'}>Cek Status Pendaftaran</Link>
      </CardBody>
    </Card>
  )
}