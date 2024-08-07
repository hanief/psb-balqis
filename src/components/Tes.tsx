import { Button, Card, CardBody } from "reactstrap";
import {DateTime} from 'luxon'
import NextImage from 'next/image'
import { toPng } from 'html-to-image'
import { useContents } from "@/data/contents";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Tes({ registration }) {
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

  return (
    <Card>
      <CardBody>
        <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>
          {getKonten('status_terdaftar')}
        </ReactMarkdown>
        <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>
          {registration?.status_terdaftar_text}
        </ReactMarkdown>
        <p>Silakan menyimpan kartu pendaftaran di bawah ini:</p>
        <div style={{width: '330px'}}>
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
                      {registration?.jenjang === 'sd' && <td>SD IT Baitul Quran Yogyakarta</td>}
                      {registration?.jenjang === 'smp' && <td>SMP IT Baitul Quran Yogyakarta</td>}
                      {registration?.jenjang === 'sma' && <td>SMA IT Baitul Quran Yogyakarta</td>}
                    </tr>
                    <tr>
                      <th scope="row">Tempat Tanggal Lahir:</th>
                      <td>{registration?.tempat_lahir || '-'}{registration?.tanggal_lahir ? ', ' + DateTime.fromISO(registration?.tanggal_lahir).toLocaleString(DateTime.DATE_MED) : ''}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tanggal Pendaftaran:</th>
                      <td>{DateTime.fromISO(registration?.created_at).toLocaleString(DateTime.DATE_MED)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  )
}