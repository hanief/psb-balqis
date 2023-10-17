import { Button, Card, CardBody, CardTitle, Col, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import { 
  jenjangOptions,
  jenisKelaminOptions
} from '@/data/options'
import ValidatedInput from "@/components/ValidatedInput"
import ValidatedSelect from "@/components/ValidatedSelect"


export default function DataForm({
  registration,
  rules,
  validities,
  onChange,
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
          <ValidatedSelect
            options={jenjangOptions}
            name="jenjang"
            label="Jenjang Sekolah"
            placeholder='Pilih Jenjang Sekolah'
            required={rules?.jenjang}
            isSearchable={false}
            onChange={onChange}
            value={registration?.jenjang}
            valid={validities?.jenjang}
          />
          {registration?.jenjang === 'smp' && (
            <ValidatedSelect
              options={[
                {value: '3', label: '3 tahun'},
                {value: '6', label: '6 tahun'}
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