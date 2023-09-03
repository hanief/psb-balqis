import { Button, Card, CardBody, CardTitle, Col, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import { useMemo } from "react"
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
  onMultipleChanges
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
                  placeholder="Nama Lengkap"
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

          <Label for='alamat'>Alamat Rumah</Label>
          <ValidatedInput
            type="text"
            name="alamat"
            placeholder="Jalan, RT/RW, Desa/Kelurahan"
            value={registration?.alamat}
            required={rules?.alamat}
            valid={validities?.alamat}
            onChange={onChange}
          />
          <ValidatedSelect
            options={provinces?.map(province => ({value: province.code, label: province.province}))}
            name="provinsi"
            placeholder='Pilih Provinsi'
            required={rules?.provinsi}
            onChange={(name, value) => onMultipleChanges([
              {key: 'provinsi', value: value},
              {key: 'kabupaten', value: ''},
              {key: 'kecamatan', value: ''},
              {key: 'desa', value: ''},
              {key: 'kodepos', value: ''},
            ])}
            value={registration?.provinsi}
            valid={validities?.provinsi}
          />
          <ValidatedSelect
            options={kabupatens?.map(kabupaten => ({value: kabupaten.code, label: kabupaten.city}))}
            name="kabupaten"
            placeholder='Pilih Kabupaten'
            required={rules?.kabupaten}
            onChange={(name, value) => onMultipleChanges([
              {key: 'kabupaten', value: value},
              {key: 'kecamatan', value: ''},
              {key: 'desa', value: ''},
              {key: 'kodepos', value: ''},
            ])}
            value={registration?.kabupaten}
            valid={validities?.kabupaten}
          />
          <ValidatedSelect
            options={kecamatans?.map(kecamatan => ({value: kecamatan.code, label: kecamatan.district}))}
            name="kecamatan"
            placeholder='Pilih Kecamatan'
            required={rules?.kecamatan}
            onChange={(name, value) => onMultipleChanges([
              {key: 'kecamatan', value: value},
              {key: 'desa', value: ''},
              {key: 'kodepos', value: ''},
            ])}
            value={registration?.kecamatan}
            valid={validities?.kecamatan}
          />
          <ValidatedSelect
            options={desas?.map(desa => ({value: desa.code, label: desa.village}))}
            name="desa"
            placeholder='Pilih Desa'
            required={rules?.desa}
            onChange={(name, value) => {
              const desa = desas?.find(desa => desa.code === value)
              onMultipleChanges([
                {key: 'desa', value: value},
                {key: 'kodepos', value: desa ? `${desa.postal}` : null},
              ])
            }}
            value={registration?.desa}
            valid={validities?.desa}
          />
          <ValidatedInput
            type="text"
            name="kodepos"
            placeholder="Kode Pos"
            value={registration?.kodepos}
            required={rules?.kodepos}
            valid={validities?.kodepos}
            onChange={onChange}
          />
        </CardBody>
      </Card>
    </Col>
  )
}