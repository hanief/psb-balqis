import { Button } from "reactstrap";

export default function Pengumuman({onSuccess}) {
  return (
    <>
      <h1>Pengumuman</h1>

      <p>Selamat, anda telah</p>
      <h1 className="text-success">DITERIMA</h1>
      <p>di Balqis Jogja.</p>

      <p>Silakan mendaftarkan ulang</p>

      <Button color='primary' className='me-1' onClick={onSuccess}>
        Lanjut
      </Button>
    </>
  )
}