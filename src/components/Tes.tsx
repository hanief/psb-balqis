import { Button } from "reactstrap";

export default function Tes({onSuccess}) {
  return (
    <>
      <h1>Tes Masuk</h1>

      <p>
        Tes masuk akan dilaksanakan pada tanggal 23-24 September 2023.
      </p>

      <h2>Materi tes</h2>
      <ul>
      <li>
      <h2>Tes Akademik dan Pesantren</h2>
      <ul>
      <li>Meliputi 4 mapel:  B. Indonesia, B. Inggris, IPA, Matematika, PAI, dan B. Arab</li>
      <li>Masing-masing mapel 10 soal dan dikerjakan dalam 90 menit</li>
      </ul>
      </li>
      <li>
      <h2>Tes Tahfidz dan Wawancara Santri</h2>
      <ul>
      <li>Tes bacaan Al-Qur’an</li>
      <li>Peserta menyetorkan hafalan yang sudah dihafalkan di rumah: Q.S. Ar-Ra’du ayat 1-5 (pendaftar SMP), Q.S. Ar-Ra’du ayat 1-13 (pendaftar SMA)</li>
      <li>Wawancara santri terkait kemandirian dan kesiapan mondok</li>
      </ul>
      </li>
      <li>
      <h2>Wawancara Wali Santri</h2>
      <ul>
      <li>Wali santri terlebih dahulu mengisi kuisoner pada bit.ly/kuesionerwali2324</li>
      <li>Wali santri mencetak surat pernyataan kemudian mengisi dan menyerahkan ketika wawancara (format terlampir)</li>
      <li>Bagi yang seleksi secara daring, wajib mengirimkan scan surat pernyataan yang telah diisi sebelumnya</li>
      <li>Setiap wali wajib mengambil salinan 3 surat pernyataan di tempat registrasi diakhir sesi sebelum kembali ke rumah</li>
      </ul>
      </li>
      </ul>
      <p>
        Mohon dipersiapkan dengan baik.
      </p>

      {/* <Button block color='primary' className='m-1' onClick={onSuccess}>
        Lanjut
      </Button> */}
    </>
  )
}