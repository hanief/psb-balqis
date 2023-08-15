import { useProof, useRegistration } from "@/model/registration";
import { Button, Card, CardBody, FormGroup, Input, Label, Spinner } from "reactstrap";

export default function Bayar({onSuccess}) {
  const {registration, isUploading, uploadBukti, deleteBukti} = useRegistration()
  
  return (
    <>
      <Card>
        <CardBody>
          {registration?.bukti_pembayaran ? (
            <div>
              <h2>Terima kasih.</h2>
              <p>Anda sudah mengunggah bukti pembayaran.</p>
              <p>Mohon menunggu hingga panitia PSB mengkonfirmasi pembayaran anda untuk bisa melanjutkan ke tahap berikutnya</p>
              <Button
                color="danger" 
                onClick={() => {
                  deleteBukti('pembayaran')
                }}>
                  Hapus bukti pembayaran
              </Button>
            </div>
          ) : (
            <>
            {isUploading ? (
              <>
                <Spinner>
                  Uploading...
                </Spinner>
                <span>Uploading...</span>
              </>
            ) : (
              <>
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
                <FormGroup>
                  <Label for="bukti_pembayaran">Upload berkas bukti pembayaran</Label>
                  <Input 
                    className='mb-1'
                    type="file"
                    id="bukti_pembayaran"
                    placeholder="Bukti Pembayaran"
                    accept="image/*,.pdf"
                    onChange={event => {
                      const file = event.target.files[0]
                      const type = 'pembayaran'
                      uploadBukti(file, type)
                    }}
                  />
                </FormGroup>
              </>
            )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  )
}