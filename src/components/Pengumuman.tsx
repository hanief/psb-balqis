import { Button } from "reactstrap";

export default function Pengumuman({onSuccess}) {
  return (
    <>
      <h1>Pengumuman</h1>

      <p>
        Selamat, anda telah DITERIMA di Balqis Jogja. Silahkan cek email anda untuk informasi lebih lanjut.
      </p>

      <p>
        Silakan mendaftarkan ulang
      </p>

      <Button color='primary' className='me-1' onClick={onSuccess}>
        Lanjut
      </Button>
    </>
  )
}