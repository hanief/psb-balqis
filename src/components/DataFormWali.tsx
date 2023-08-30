import { Button, Card, CardBody, CardTitle, Col, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import Select from 'react-select'
import { useMemo } from "react"
import { 
  jalurPendaftaranOptions, 
  jenjangOptions, 
  jalurBeasiswaKhususOptions,
  jalurBeasiswaPrestasiOptions,
  jenisKelaminOptions
} from '@/data/options'
import { Wilayah } from '@/types'
import data from '@/data/wilayah.json'
import ValidatedInput from "@/components/ValidatedInput"
import ValidatedSelect from "@/components/ValidatedSelect"

const provinces = data as Wilayah[]

export default function DataForm({
  registration,
  rules,
  validities,
  onChange,
  onMultipleChanges,
  uploadBukti,
  deleteBukti,
  downloadBukti
}) {
  const kabupatens = useMemo(() => provinces.find(province => province.code === registration?.provinsi)?.cities, [registration?.provinsi])
  const kecamatans = useMemo(() => kabupatens?.find(kabupaten => kabupaten.code === registration?.kabupaten)?.districts, [kabupatens, registration?.kabupaten])
  const desas = useMemo(() => kecamatans?.find(kecamatan => kecamatan.code === registration?.kecamatan)?.villages, [kecamatans, registration?.kecamatan])

  return (
    <Col>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className='mb-4'>Data Orang Tua/Wali Santri</CardTitle>
          <FormGroup>
            <Label for='nama_ayah'>Ayah / Wali 1</Label>
            
            <Row>
              <Col lg="6">
                <ValidatedInput
                  type="text"
                  name="nama_ayah"
                  placeholder="Nama Lengkap"
                  value={registration?.nama_ayah}
                  required={rules?.nama_ayah}
                  valid={validities?.nama_ayah}
                  onChange={onChange}
                />
              </Col>
              <Col lg="6">
                <ValidatedInput
                  type="text"
                  name="nomor_hp_ayah"
                  placeholder="Nomor HP"
                  value={registration?.nomor_hp_ayah}
                  required={rules?.nomor_hp_ayah}
                  valid={validities?.nomor_hp_ayah}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for='asal_sekolah'>Ibu / Wali 2</Label>
            <Row>
              <Col lg="6">
                <ValidatedInput
                  type="text"
                  name="nama_ibu"
                  placeholder="Nomor HP"
                  value={registration?.nama_ibu}
                  required={rules?.nama_ibu}
                  valid={validities?.nama_ibu}
                  onChange={onChange}
                />
              </Col>
              <Col lg="6">
                <ValidatedInput
                  type="text"
                  name="nomor_hp_ibu"
                  placeholder="Nomor HP"
                  value={registration?.nomor_hp_ibu}
                  required={rules?.nomor_hp_ibu}
                  valid={validities?.nomor_hp_ibu}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  )
}