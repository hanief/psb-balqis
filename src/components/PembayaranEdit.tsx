import { Button, Card, CardBody, FormGroup, Input, Label, Spinner } from "reactstrap";

export default function PembayaranEdit({
  registration,
  uploadBukti, 
  downloadBukti, 
  deleteBukti
}) {
  if (registration?.bukti_pembayaran) {
    return (
      <Card>
        <CardBody>
          <h2>Bukti Pembayaran</h2>
          <Button
            className="me-1"
            color="success" 
            onClick={() => {
              downloadBukti(registration?.bukti_pembayaran)
            }}>
              Unduh Bukti Pembayaran
          </Button>
          <Button
            color="danger" 
            onClick={() => {
              deleteBukti('pembayaran')
            }}>
              Hapus bukti pembayaran
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
          <FormGroup>
            <Label for="bukti_pembayaran">Upload berkas bukti pembayaran</Label>
            <Input 
              className='mb-1'
              type="file"
              id="bukti_pembayaran"
              placeholder="Bukti Pembayaran"
              accept="image/*,.pdf"
              onChange={event => {
                console.log('onChange', event.target.files[0])
                const file = event.target.files[0]
                const type = 'pembayaran'
                uploadBukti(file, type)
              }}
            />
          </FormGroup>
      </CardBody>
    </Card>
  )
}