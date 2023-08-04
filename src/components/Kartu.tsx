import { Button } from "reactstrap";

export default function Kartu({ onSuccess }) {
  return (
    <>
      <h1>Kartu Pendaftaran</h1>
      <p>Ini adalah kartu pendaftaran siswa</p>
      <p>Kartu ini mohon disimpan sebagai bukti pendaftaran dan kartu tes</p>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Kartu Pendaftaran</h5>
          <p className="card-text">Nama: Ahmad</p>
          <p className="card-text">NISN: 1234567890</p>
          <p className="card-text">Tanggal Lahir: 1 Januari 2000</p>
          <p className="card-text">Jenis Kelamin: Laki-laki</p>
          <p className="card-text">Alamat: Jl. P. Mangkubumi, Karangijo Kulon, Ponjong, Gunungkidul, D.I Yogyakarta 55892</p>
          <p className="card-text">Asal Sekolah: SMP Negeri 1 Ponjong</p>
          <p className="card-text">Jurusan: IPA</p>
          <p className="card-text">Pilihan Kelas: X MIPA 1</p>
          <p className="card-text">Tanggal Daftar: 1 Januari 2021</p>
          <p className="card-text">Status: Menunggu Pembayaran</p>

          <Button color="primary">Download</Button>

        </div>
      </div>

      <Button block color='primary' className='m-1' onClick={onSuccess}>
        Lanjut
      </Button>
    </>
  )
}