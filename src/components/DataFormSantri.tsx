import { Button, Card, CardBody, CardTitle, Col, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import { 
  jenjangOptions,
  jenisKelaminOptions
} from '@/data/options'
import ValidatedInput from "@/components/ValidatedInput"
import ValidatedSelect from "@/components/ValidatedSelect"


export default function DataFormSantri({
  registration,
  rules,
  validities,
  onChange,
  isEditing = false
}) {
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
          <ValidatedInput
            type="text"
            name="nik"
            label="NIK (Nomor Induk Kependudukan)" 
            placeholder="contoh: 31231241324879712"
            value={registration?.nik}
            valid={validities?.nik}
            required={rules?.nik}
            onChange={onChange}
          />
          <ValidatedSelect
            options={jenjangOptions}
            name="jenjang"
            label="Jenjang Sekolah"
            placeholder='Pilih Jenjang Sekolah'
            required={rules?.jenjang}
            isSearchable={false}
            onChange={onChange}
            isDisabled={!isEditing}
            value={registration?.jenjang}
            valid={validities?.jenjang}
          />
          {registration?.jenjang === 'smp' && (
            <ValidatedSelect
              options={[
                {value: 'fullday', label: 'Kelas Fullday'},
                {value: 'boarding', label: 'Kelas Khusus (Boarding)'},
                {value: 'unggulan', label: 'Kelas Unggulan (Al Bassam)'}
              ]}
              name="program_jenjang"
              label="Program"
              placeholder='Pilih Program'
              required={rules?.program_jenjang}
              isSearchable={false}
              onChange={onChange}
              value={registration?.program_jenjang}
              valid={validities?.program_jenjang}
            />
          )}
          <ValidatedSelect
            options={jenisKelaminOptions}
            name="jenis_kelamin"
            label="Jenis Kelamin"
            placeholder='Pilih Jenis Kelamin'
            required={rules?.jenis_kelamin}
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
        </CardBody>
      </Card>
    </Col>
  )
}