import { Card, CardBody, FormGroup, Input } from "reactstrap";
import Link from "next/link";
import { useContents } from "@/data/contents";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
export default function Bayar({ registration, onUploadBukti }) {  
  const { getKonten } = useContents()
  
  if (registration?.pembayaran_diterima) {
    return (
      <Card>
        <CardBody className="text-center">
          <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

            {getKonten('bayar_pembayaran_konfirmasi')}
          </ReactMarkdown>
        </CardBody>
      </Card>
    )
  }

  if (registration?.bukti_pembayaran) {
    return (
      <Card>
        <CardBody className="text-center">
          <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>

            {getKonten('bayar_bukti_diupload')}
          </ReactMarkdown>
          <br />
          <p>Anda dapat melihat status pendaftaran setiap saat dengan mengunjungi halaman:</p>
          <Link className="btn btn-balqis" href={'/status'}>Cek Status Pendaftaran</Link>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <ReactMarkdown rehypePlugins={[rehypeRaw] as any}>
          {getKonten('bayar_upload')}
        </ReactMarkdown>
        <p className="card-text">
          Setelah melakukan pembayaran, mohon upload bukti pembayaran melalui form berikut:
        </p>
        <FormGroup>
          <Input 
            className='mb-1'
            type="file"
            id="bukti_pembayaran"
            placeholder="Bukti Pembayaran"
            accept="image/*,.pdf"
            onChange={event => {
              const file = event.target.files[0]
              const type = 'pembayaran'
              onUploadBukti(file, type)
            }}
          />
        </FormGroup>
      </CardBody>
    </Card>
  )
}