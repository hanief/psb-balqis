import { useSingleRegistration } from "@/data/singleRegistration";
import { Button, Card, CardBody } from "reactstrap";
import {DateTime} from 'luxon'
import NextImage from 'next/image'
import { toPng } from 'html-to-image'
import { useUser } from "@supabase/auth-helpers-react";

export default function Tes({ registration }) {
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
        <h2>Terima kasih</h2>
        <p>Anda telah terdaftar sebagai calon santri BALQIS Jogja periode 2024/2025.</p>
        <p>Selanjutnya, calon santri wajib mengikuti tes masuk sekolah.</p>
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
                      <th scope="row">Nomor Pendaftaran:</th>
                      <td>2024-{registration?.jenis_kelamin === 'laki-laki' ? '1' : '2'}-{registration?.id}</td>
                    </tr>
                    <tr>
                      <th scope="row">Jenis Kelamin:</th>
                      <td>{registration?.jenis_kelamin === 'laki-laki' ? 'Laki-laki' : 'Perempuan'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Jenjang:</th>
                      <td>{registration?.jenjang === 'smp' ? 'SMP IT Baitul Quran Yogyakarta' : 'SMA IT Baitul Quran Yogyakarta'}</td>
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
        
        <hr />
        
        <h2 className="text-success">Pelaksanaan tes</h2>
        <p>Tes masuk akan dilaksanakan pada tanggal <strong>23-24 September 2023</strong>.</p>
        <hr/>

        <h2 className="text-success">Materi tes</h2>
        <h4>Tes Akademik dan Pesantren</h4>
        <ul>
          <li>Meliputi 4 mapel:  B. Indonesia, B. Inggris, IPA, Matematika, PAI, dan B. Arab</li>
          <li>Masing-masing mapel 10 soal dan dikerjakan dalam 90 menit</li>
        </ul>

        <h4>Tes Tahfidz dan Wawancara Santri</h4>
        <ul>
          <li>Tes bacaan Al-Qur&apos;an</li>
          <li>Peserta menyetorkan hafalan yang sudah dihafalkan di rumah: Q.S. Ar-Ra&apos;du ayat 1-5 (pendaftar SMP), Q.S. Ar-Ra’du ayat 1-13 (pendaftar SMA)</li>
          <li>Wawancara santri terkait kemandirian dan kesiapan mondok</li>
        </ul>

        <h4>Wawancara Wali Santri</h4>
        <ul>
          <li>Wali santri terlebih dahulu mengisi kuisoner pada <a href="https://bit.ly/kuesionerwali2324">link ini</a></li>
          <li>Wali santri mencetak surat pernyataan kemudian mengisi dan menyerahkan ketika wawancara (format terlampir)</li>
          <li>Bagi yang seleksi secara daring, wajib mengirimkan scan surat pernyataan yang telah diisi sebelumnya</li>
          <li>Setiap wali wajib mengambil salinan 3 surat pernyataan di tempat registrasi diakhir sesi sebelum kembali ke rumah</li>
        </ul>
      </CardBody>
    </Card>
  )
}