import { columnsObject } from "@/data/columns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { debounce } from 'lodash'
import { usePendaftaran } from "@/data/pendaftaran";
import Select from "react-select";
import { statusPenerimaanOptions } from "@/data/options";

export default function HasilTesEdit({initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  const {
    singleRegistration: remoteRegistration
  } = usePendaftaran({
    specificUserId: initialRegistration?.user_id,
    selectedColumn: null,
    keyword: null,
    showDeleted: false
  })
  const [registration, setRegistration] = useState(initialRegistration || columnsObject)

  const saveRegistrationData = useCallback(handleUpdateData, [])
  const handleUpdateRegistration = useMemo(() => debounce(saveRegistrationData, 750), [saveRegistrationData])

  useEffect(() => {
    if (!remoteRegistration) return

    const newRegData = registration
    Object.keys(registration).forEach(key => {
      if (registration[key] !== remoteRegistration[key]) {
        newRegData[key] = remoteRegistration[key]
      }
    })
    setRegistration(newRegData)
  }, [remoteRegistration])

  function handleUpdateData(data) {
    updateSpecificRegistrationData(initialRegistration?.user_id, data)

    if (!onUpdate) return
    
    onUpdate(data)
  }
  
  function handleRegistrationFieldChange(key, value) {
    const updatedData = {[key]: value}
    setRegistration({ ...registration, ...updatedData})
    handleUpdateRegistration(updatedData)
  }
  
  return (
    <Row className='row-cols-1 row-cols-md-2 g-4'>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Hasil Tes</CardTitle>
            <FormGroup>
              <Label for='nilai_tahsin'>Nilai Tahsin / Tahfiz</Label>
              <Input
                type="text"
                id="nilai_tahsin"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_tahsin}
                onChange={event => handleRegistrationFieldChange('nilai_tahsin', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='nilai_akademik'>Nilai Akademik</Label>
              <Input
                type="text"
                id="nilai_akademik"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_akademik}
                onChange={event => handleRegistrationFieldChange('nilai_akademik', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='nilai_pesantren'>Nilai Pesantren</Label>
              <Input
                type="text"
                id="nilai_pesantren"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_pesantren}
                onChange={event => handleRegistrationFieldChange('nilai_pesantren', event.target.value)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Catatan Khusus Internal</CardTitle>
            <FormGroup>
              <Label for='catatan_internal'>Catatan Khusus Internal</Label>
              <Input
                id="catatan_internal"
                name="catatan_internal"
                type="textarea"
                required={true}
                value={registration?.catatan_internal}
                onChange={event => handleRegistrationFieldChange('catatan_internal', event.target.value)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Keputusan</CardTitle>
            <FormGroup>
              <Label for='status_pendaftaran'>Status Pendaftaran</Label>
              <Select
                options={statusPenerimaanOptions}
                placeholder='Penerimaan'
                isSearchable={false}
                required={true}
                id="status_pendaftaran"
                value={statusPenerimaanOptions.find(o => o.value === registration?.status_pendaftaran)}
                onChange={event => handleRegistrationFieldChange('status_pendaftaran', event.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='syarat_penerimaan'>Syarat Penerimaan</Label>
              <Input
                id="syarat_penerimaan"
                name="syarat_penerimaan"
                type="textarea"
                required={true}
                value={registration?.syarat_penerimaan}
                onChange={event => handleRegistrationFieldChange('syarat_penerimaan', event.target.value)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}