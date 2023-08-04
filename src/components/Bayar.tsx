import { Card, CardBody } from "reactstrap";

export default function Bayar({onSuccess}) {
  return (
    <>
      <h1>Pembayaran</h1>
      <Card>
        <CardBody>
          <h2 className="card-title">Informasi Pembayaran</h2>
          <p className="card-text">
            Pembayaran dapat dilakukan melalui transfer ke rekening berikut:
          </p>
          <ul className="list-unstyled">
            <li>Bank BNI Syariah</li>
            <li>No. Rekening: 1234567890</li>
            <li>Atas Nama: Balqis Jogja</li>
          </ul>

          <p className="card-text">
            Setelah melakukan pembayaran, silahkan upload bukti pembayaran melalui form berikut:
          </p>

          <form>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">Nama</label>
              <input type="text" className="form-control" id="nama" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="bukti" className="form-label">Bukti Pembayaran</label>
              <input className="form-control" type="file" id="bukti" />
            </div>
            <button className="btn btn-primary" onClick={(e) => {
              e.preventDefault()
              onSuccess()
            }}>Submit</button>
          </form>
        </CardBody>
      </Card>
    </>
  )
}