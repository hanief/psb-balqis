import { Button } from "reactstrap";

export default function Tes({onSuccess}) {
  return (
    <>
      <h1>Tes Masuk</h1>

      <p>
        Tes masuk akan dilaksanakan pada tanggal 23-24 September 2023.
      </p>

      <h2>Materi tes</h2>
      <p>
        a.	Tes Akademik dan Pesantren (Update Soal agar lebih valid)
        	Meliputi 4 mapel:  B. Indonesia, B. Inggris, IPA, Matematika, PAI, dan B. Arab
        	Masing-masing mapel 10 soal dan dikerjakan dalam 90 menit
        b.	Tes Tahfidz dan Wawancara Santri
        	Tes bacaan Al-Qur’an
        	Peserta menyetorkan hafalan yang sudah dihafalkan di rumah: Q.S. Ar-Ra’du ayat 1-5 (pendaftar SMP), Q.S. Ar-Ra’du ayat 1-13 (pendaftar SMA)
        	Wawancara santri terkait kemandirian dan kesiapan mondok
        c.	Wawancara Wali Santri
        	Wali santri terlebih dahulu mengisi kuisoner pada bit.ly/kuesionerwali2324  
        	Wali santri mencetak surat pernyataan kemudian mengisi dan menyerahkan ketika wawancara (format terlampir)
        	Bagi yang seleksi secara daring, wajib mengirimkan scan surat pernyataan yang telah diisi sebelumnya
        	Setiap wali wajib mengambil salinan 3 surat pernyataan di tempat registrasi diakhir sesi sebelum kembali ke rumah

      </p>
      <p>
        Mohon dipersiapkan dengan baik.
      </p>

      <Button block color='primary' className='m-1' onClick={onSuccess}>
        Lanjut
      </Button>
    </>
  )
}