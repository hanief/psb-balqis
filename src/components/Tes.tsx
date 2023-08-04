import { Button } from "reactstrap";

export default function Tes({onSuccess}) {
  return (
    <>
      <h1>Tes Masuk</h1>

      <p>
        Tes masuk akan dilaksanakan pada tanggal 1 Januari 2022.
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