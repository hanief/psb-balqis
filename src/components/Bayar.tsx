import { Card, CardBody } from "reactstrap";

export default function Bayar({onSuccess}) {
  return (
    <>
      <Card>
        <CardBody>
          <h2 className="card-title">Biaya Pendaftaran</h2>
          <p className="card-text">
            Mohon melakukan pembayaran sebesar <strong>Rp. 250.000</strong> untuk biaya pendaftaran.
          </p>
          <p>
             Pembayaran dapat dilakukan melalui transfer ke rekening berikut:
          </p>
          <ul className="list-unstyled">
            <li>Bank: <strong>Bank Syariah Indonesia (BSI)</strong></li>
            <li>No. Rekening: <strong>7088404267</strong></li>
            <li>Atas Nama: <strong>Yayasan Baitul Qur&apos;an Yogyakarta</strong></li>
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