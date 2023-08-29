import { usePendaftaran } from "@/data/pendaftaran"
import { useUser } from "@supabase/auth-helpers-react";
import { Button, Card, CardBody, FormGroup, Input, Label, Spinner } from "reactstrap";

export default function DataEdit({initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  const user = useUser()
const {
    singleRegistration: remoteRegistration,
    isUploading, 
    uploadBukti, 
    downloadBukti, 
    deleteBukti
  } = usePendaftaran({
    specificUserId: initialRegistration?.user_id,
    selectedColumn: null,
    keyword: null,
    showDeleted: false
  })

  if (remoteRegistration?.bukti_pembayaran) {
    return (
      <Card>
        <CardBody>
          <h2>Bukti Pembayaran</h2>
          <Button
            className="me-1"
            color="success" 
            onClick={() => {
              downloadBukti(remoteRegistration?.nama_lengkap, remoteRegistration?.bukti_pembayaran)
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

  if (isUploading) {
    return (
      <Card>
        <CardBody>
          <h2><Spinner /> Sedang mengunggah bukti pembayaran...</h2>
        </CardBody>
      </Card>
    )
  }

  return (
    <>
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
                  const file = event.target.files[0]
                  const type = 'pembayaran'
                  uploadBukti(file, type)
                }}
              />
            </FormGroup>
        </CardBody>
      </Card>
    </>
  )
}