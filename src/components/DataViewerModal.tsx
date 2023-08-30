import { Alert, Button, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import DataEdit from "./DataEdit";
import { useEffect, useMemo, useState } from "react";
import HasilTesEdit from "./HasilTesEdit";
import PasswordEdit from "./PasswordEdit";
import PembayaranEdit from "./PembayaranEdit";
import { useSingleRegistration } from "@/data/singleRegistration";
import DataForm from "./DataForm";
import { convertToTitleCase } from "@/utils"

export default function DataViewerModal({
  isOpen,
  toggle,
  initialRegistration,
  onUpdate,
}) {
  const [activeTab, setActiveTab] = useState('1')
  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)
  
  const {
    registration,
    change,
    changeMultiple,
    uploadBukti, 
    deleteBukti, 
    downloadBukti
  } = useSingleRegistration(initialRegistration?.user_id, onUpdate, initialRegistration)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = useMemo(() => {
    return {
      'nama_lengkap': true,
      'jenis_kelamin': true,
      'tempat_lahir': true,
      'tanggal_lahir': true,
      'asal_sekolah': true,
      'jenjang': true,
      'jalur_pendaftaran': true,
      // 'jalur_beasiswa': true,
      // 'jalur_beasiswa_khusus': localRegistration?.jalur_pendaftaran === 'afirmasi',
      // 'jalur_beasiswa_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'nama_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'tingkat_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'tahun_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'bukti_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'bukti_dhuafa': localRegistration?.jalur_beasiswa_khusus === 'dhuafa',
      // 'bukti_yatim':  localRegistration?.jalur_beasiswa_khusus === 'yatim',
      'nama_ayah': true,
      'nomor_hp_ayah': true,
      'nama_ibu': true,
      'nomor_hp_ibu': true,
      'alamat': true,
      // 'provinsi': true,
      // 'kabupaten': true,
      // 'kecamatan': true,
      // 'desa': true,
      // 'kodepos': true,
    }
  }, [localRegistration])

  useEffect(() => {
    setLocalRegistration(registration)
  }, [registration])

  const validities = useMemo(() => {
    return Object.keys(requiredRules).reduce((acc, field) => {
      acc[field] = requiredRules[field] && localRegistration && localRegistration[field]
      return acc
    }, {})
  }, [localRegistration])

  const isValid = useMemo(() => {
    return Object.keys(requiredRules).every(field => {
      if (!requiredRules[field]) return true

      return localRegistration && localRegistration[field]
    })
  }, [localRegistration])
  
  useEffect(() => {
    if (isValid && showValiditiesWarning) {
      setShowValiditiesWarning(false)
    }
  }, [isValid])

  function toggleModal() {
    if (isValid) {
      toggle()
      setActiveTab('1')
    }

    if (!isValid && !showValiditiesWarning) {
      setShowValiditiesWarning(true)
    }
  }

  function handleChange(name, value) {
    setLocalRegistration({
      ...localRegistration,
      [name]: value
    })
    if (requiredRules[name] && value) {
      change(name, value)
    }
  } 
  
  function handleMultipleChanges(changes) {
    const newRegistration = {}
    let isValid = true
    changes.forEach(change => {
      newRegistration[change.key] = change.value
      if (requiredRules[change.key] && !change.value) {
        isValid = false
      }
    })

    setLocalRegistration({
      ...localRegistration,
      ...newRegistration
    })

    if (isValid) {
      changeMultiple(changes)
    }
  }


  return (
    <Modal 
      centered
      backdrop="static"
      size="xl" 
      isOpen={isOpen} 
      toggle={toggleModal}
      onOpened={() => {
        setShowValiditiesWarning(false)
      }}
    >
      <ModalHeader toggle={toggleModal} className="d-flex justify-content-between">
        <span className="me-2">Ubah Data Pendaftar</span>
      </ModalHeader>
      <ModalBody>
        {showValiditiesWarning && (
          <Alert fade color="danger">
            <i className="bi-exclamation-circle me-2"></i>Ada isian yang masih kosong, mohon diperbaiki terlebih dahulu:
            <ul>
              {Object.keys(validities).map(field => {
                if (validities[field]) return null

                return (
                  <li key={field}>{convertToTitleCase(field)}</li>
                )
              })}
            </ul>
            <Button color="outline-secondary" onClick={toggle}>Perbaiki nanti dan tutup</Button>
          </Alert>
        )}
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === '1'}
              onClick={() => setActiveTab('1')}
            >
              Data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '2'}
              onClick={() => setActiveTab('2')}
            >
              Pembayaran
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '3'}
              onClick={() => setActiveTab('3')}
            >
              Tes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '4'}
              onClick={() => setActiveTab('4')}
            >
              Password
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="mt-2" activeTab={activeTab}>
          <TabPane tabId="1">
            <DataForm 
              registration={localRegistration}
              rules={requiredRules}
              validities={validities}
              onChange={handleChange}
              onMultipleChanges={handleMultipleChanges}
              uploadBukti={uploadBukti}
              deleteBukti={deleteBukti}
              downloadBukti={downloadBukti}
            />
          </TabPane>
          <TabPane tabId="2">
            <PembayaranEdit
              registration={registration}
              uploadBukti={uploadBukti}
              deleteBukti={deleteBukti}
              downloadBukti={downloadBukti}
            />
          </TabPane>
          <TabPane tabId="3">
            <HasilTesEdit 
              registration={registration}
              onChange={change}
            />
          </TabPane>
          <TabPane tabId="4">
            <PasswordEdit initialRegistration={initialRegistration}/>
          </TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  )
}