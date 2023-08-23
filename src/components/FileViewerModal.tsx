import Link from "next/link"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function FileViewerModal({type, url, isOpen, toggle}) {
  const [fileURL, setFileURL] = useState(null)
  
  useEffect(() => {
    if (url) {
      getSignedFileURL()
    } else {
      setFileURL(null)
    }
  }, [url])

  async function getSignedFileURL() {
    const {data} = await supabase.storage.from('proofs').getPublicUrl(url)
    setFileURL(data.publicUrl)

    return data
  }

  async function downloadFile() {
    const {data} = await supabase.storage.from('proofs').download(url)
  }

  function getFileExtension() {
    const ext = url.split('.').pop()

    return ext
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg' centered>
      <ModalHeader toggle={toggle}>{type}</ModalHeader>
      <ModalBody>
        {fileURL && (
          <div>
            <Link
              target="_blank"
              className="btn btn-primary btn-lg mb-2" 
              href={fileURL}
              download={fileURL}>
              <i className="bi bi-download me-1"></i>Download
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
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={toggle}>Tutup</button>
      </ModalFooter>
    </Modal>  
  )
}