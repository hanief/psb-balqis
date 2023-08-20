import Link from "next/link"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { supabase } from "@/lib/supabase"
import { useMemo, useState } from "react"
import Image from "next/image"

export default function FileViewerModal({type, url, isOpen, toggle, onClose}) {
  const [fileURL, setFileURL] = useState(null)
  
  async function getFileURL() {
    const {data} = await supabase.storage.from('bukti').createSignedUrl(url, 60)
    console.log('url', data)
    setFileURL(data)

    return data
  }

  function getFileExtension() {
    return url.split('.').pop()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg' centered onClosed={onClose}>
      <ModalHeader>{type}</ModalHeader>
      <ModalBody>
        <Link target="_blank" className="btn btn-primary btn-lg mb-2" href="brosur_psb_2024.pdf" download="brosur_psb_2024.pdf">
          <i className="bi bi-download me-1"></i>Download Brosur
        </Link>
        {getFileExtension() === 'pdf' ? (
          <object data={fileURL} type="application/pdf" width="100%" height="600px">
            <embed src={fileURL} width="100%" height="600px"/> 
          </object>
        ) : (
          <Image 
            src={fileURL} 
            alt="file image" 
            fill/>
        )}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={toggle}>Tutup</button>
      </ModalFooter>
    </Modal>  
  )
}