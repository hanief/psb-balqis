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
          <CardTitle tag="h5" className='mb-4'>Data Calon Santri</CardTitle>
          <ValidatedInput
            type="text"
            name="nama_lengkap"
            label="Nama Lengkap" 
            placeholder="contoh: Ahmad Fulan"
            value={registration?.nama_lengkap}
            valid={validities?.nama_lengkap}
            required={rules?.nama_lengkap}
            onChange={onChange}
          />
          <ValidatedSelect
            options={jenisKelaminOptions}
            name="jenis_kelamin"
            label="Jenis Kelamin"
            placeholder='Pilih Jenis Kelamin'
            required={rules.jenis_kelamin}
            valid={validities?.jenis_kelamin}
            isSearchable={false}
            onChange={onChange}
            value={registration?.jenis_kelamin}
          />
          <div className='d-flex justify-content-between'>
            <ValidatedInput
              className='flex-grow-1 me-2'
              type="text"
              name="tempat_lahir"
              label="Tempat Lahir" 
              placeholder="contoh: Bantul"
              value={registration?.tempat_lahir}
              valid={validities?.tempat_lahir}
              required={rules?.tempat_lahir}
              onChange={onChange}
            />
            <ValidatedInput
              type="date"
              name="tanggal_lahir"
              label="Tanggal Lahir"
              placeholder="contoh: 17/08/1945"
              value={registration?.tanggal_lahir}
              valid={validities?.tanggal_lahir}
              required={rules?.tanggal_lahir}
              onChange={onChange}
            />
          </div>
          <ValidatedInput
            type="text"
            name="asal_sekolah"
            label="Asal Sekolah" 
            placeholder="contoh: SMA 1 Bantul"
            value={registration?.asal_sekolah}
            valid={validities?.asal_sekolah}
            required={rules?.asal_sekolah}
            onChange={onChange}
          />
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