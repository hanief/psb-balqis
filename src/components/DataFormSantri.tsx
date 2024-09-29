import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"
import { 
  jenjangOptions,
  jenisKelaminOptions,
  programKelasKhususSMPOptions,
  referralOptions
} from '@/data/options'
import ValidatedInput from "@/components/ValidatedInput"
import ValidatedSelect from "@/components/ValidatedSelect"
import { useEffect } from "react"
import ValidatedSelectCreatable from "@/components/ValidatedSelectCreatable"

export default function DataFormSantri({
  registration,
  rules,
  validities,
  onChange,
  isEditing = false
}) {
  useEffect(() => {
    if (registration?.jenis_kelamin === 'perempuan') {
      onChange('program_jenjang', 'boarding')
    }
  }, [registration?.jenis_kelamin])
  
  function getAsalSekolahPlaceholder() {
    if (registration?.jenjang === 'sd') {
      return 'contoh: TK Ibnu Abbas Rongkop'
    } else if (registration?.jenjang === 'smp') {
      return 'contoh: SD Baitul Qur\'an Ponjong'
    }

    return 'contoh: SMP Baitul Qur\'an Ponjong'
  }

  function getProgramOptions() {
    if (registration?.jenis_kelamin === 'laki-laki') {
      return [
        {value: 'fullday', label: 'Kelas Fullday Putra'},
        {value: 'boarding', label: 'Kelas Khusus Boarding Putra'},
        {value: 'unggulan', label: 'Kelas Unggulan Putra (Al Bassam)'}
      ]
    } else {
      return [
        {value: 'boarding', label: 'Kelas Khusus Boarding Putri'},
      ]
    }
  }

  return (
    <Col>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className='mb-4'>Data Calon Santri {registration?.jenjang?.toUpperCase()} Baitul Quran Ponjong</CardTitle>
            <Row>
              <Col xs="12" sm="12" md="6">
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
              </Col>
              <Col>
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
              </Col>
            </Row>
          {process.env.NEXT_PUBLIC_IS_ADMIN == 'true' && (
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
          {registration?.jenjang === 'smp' && (
            <>
              <ValidatedSelect
                options={getProgramOptions()}
                name="program_jenjang"
                label="Program"
                placeholder='Pilih Program'
                required={rules?.program_jenjang}
                isSearchable={false}
                onChange={onChange}
                value={registration?.program_jenjang}
                valid={validities?.program_jenjang}
              />
              {registration?.program_jenjang === 'boarding' && (
                <ValidatedSelect
                  options={programKelasKhususSMPOptions}
                  name="program_kelas_khusus_smp"
                  label="Program Kelas Khusus"
                  placeholder='Pilih Program'
                  required={rules?.program_kelas_khusus_smp}
                  isSearchable={false}
                  onChange={onChange}
                  value={registration?.program_kelas_khusus_smp}
                  valid={validities?.program_kelas_khusus_smp}
                />
              )}
            </>
          )}
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
            placeholder={getAsalSekolahPlaceholder()}
            value={registration?.asal_sekolah}
            valid={validities?.asal_sekolah}
            required={rules?.asal_sekolah}
            onChange={onChange}
          />
          <ValidatedSelect
            options={referralOptions}
            name="referral"
            label="Darimana anda mendapat info tentang BALQIS?"
            placeholder='Pilih salah satu'
            required={rules?.referral}
            onChange={onChange}
            value={registration?.referral}
            valid={validities?.referral}
          />
        </CardBody>
      </Card>
    </Col>
  )
}