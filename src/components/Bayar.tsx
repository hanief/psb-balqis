import { Card, CardBody } from "reactstrap";

export default function Bayar({onSuccess}) {
  return (
    <>
      <Card>
        <CardBody>
          <h2 className="card-title">Informasi Pembayaran</h2>
          <p className="card-text">
            Pembayaran dapat dilakukan melalui transfer ke rekening berikut:
          </p>
          <ul className="list-unstyled">
            <li><strong>Bank BNI Syariah</strong></li>
            <li>No. Rekening: 1234567890</li>
            <li>Atas Nama: Balqis Jogja</li>
          </ul>

          <p className="card-text">
            Setelah melakukan pembayaran, silahkan upload bukti pembayaran melalui form berikut:
          </p>

          <form>
            <div className="mb-3">
              <label htmlFor="bukti" className="form-label">Bukti Pembayaran</label>
              <input className="form-control" type="file" id="bukti" />
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  )
}