import { Button } from "reactstrap";
import Image from 'next/image'
import { useRef } from "react";
import domtoimage from 'dom-to-image'

export default function Kartu({ onSuccess }) {
  const ref = useRef(null)

  return (
    <>
      <h1>Kartu Pendaftaran</h1>
      <p>Kartu ini mohon disimpan sebagai bukti pendaftaran dan kartu tes</p>

      <div className="card my-2">
        <div className="card-body">
          <div ref={ref}>
            <Image className='my-2' src="/balqis-logo.png" alt="Balqis Logo" width="180" height="52"/>
            <h4 className="card-title">Kartu Pendaftaran</h4>
            <p className="card-text"><strong>Nama:</strong> Ahmad</p>
            <p className="card-text"><strong>Tanggal Lahir:</strong> 1 Januari 2000</p>
            <p className="card-text"><strong>Jenis Kelamin:</strong> Laki-laki</p>
          </div>
        </div>
      </div>

      <Button block color="primary" onClick={() => {
            domtoimage.toJpeg(ref?.current, { quality: 0.95, bgcolor: '#fff'})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'ahmad.jpeg';
                link.href = dataUrl;
                link.click();
            });
          }}>Download</Button>
    </>
  )
}