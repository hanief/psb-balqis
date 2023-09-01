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
          <CardTitle tag="h5" className='mb-4'>Jalur Pendaftaran</CardTitle>
          <ValidatedSelect
            options={jalurPendaftaranOptions}
            name="jalur_pendaftaran"
            label="Jenis Pendaftaran"
            placeholder='Pilih Jenis Pendaftaran'
            required={rules?.jalur_pendaftaran}
            isSearchable={false}
            onChange={onChange}
            value={registration?.jalur_pendaftaran}
            valid={validities?.jalur_pendaftaran}
          />
          {registration?.jalur_pendaftaran === 'prestasi' && (
            <>
              <ValidatedSelect
                options={jalurBeasiswaPrestasiOptions}
                name="jalur_beasiswa_prestasi"
                label="Jalur Beasiswa Prestasi"
                placeholder='Pilih Jalur Beasiswa Prestasi'
                required={rules?.jalur_beasiswa_prestasi}
                isSearchable={false}
                onChange={onChange}
                value={registration?.jalur_beasiswa_prestasi}
                valid={validities?.jalur_beasiswa_prestasi}
              />
              <FormGroup>
                <Label for="nama_prestasi">Detail Prestasi</Label>
                <ValidatedInput
                  type="text"
                  name="nama_prestasi"
                  placeholder="Nama Prestasi"
                  value={registration?.nama_prestasi}
                  required={rules?.nama_prestasi}
                  valid={validities?.nama_prestasi}
                  onChange={onChange}
                />
                <ValidatedInput
                  type="text"
                  name="tingkat_prestasi"
                  placeholder="Tingkat Prestasi (contoh: Kabupaten, Provinsi, Nasional)"
                  value={registration?.tingkat_prestasi}
                  required={rules?.tingkat_prestasi}
                  valid={validities?.tingkat_prestasi}
                  onChange={onChange}
                />
                <ValidatedInput
                  type="text"
                  name="tahun_prestasi"
                  placeholder="Tahun Prestasi (contoh: 2020)"
                  value={registration?.tahun_prestasi}
                  required={rules?.tahun_prestasi}
                  valid={validities?.tahun_prestasi}
                  onChange={onChange}
                />
              </FormGroup>
              {registration?.bukti_prestasi ? (
                <FormGroup>
                  <Label for="bukti_prestasi">Bukti Prestasi</Label>
                  <InputGroup>
                    <Input name="bukti_prestasi" type="text" disabled value="Berkas bukti sudah tersimpan"></Input>
                    <Button
                      color="success" 
                      onClick={() => {
                        downloadBukti(registration?.bukti_prestasi)
                      }}>
                        <i className='bi-download'></i>
                    </Button>
                    <Button
                      color="danger" 
                      onClick={() => {
                        deleteBukti('prestasi')
                      }}>
                        <i className='bi-trash'></i>
                    </Button>
                  </InputGroup>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label for="bukti_prestasi">Upload berkas bukti prestasi (Sertifikat, Ijazah, dll)</Label>
                  <Input 
                    className='mb-1'
                    type="file"
                    id="bukti_prestasi"
                    name="bukti_prestasi"
                    placeholder="Bukti Prestasi"
                    accept="image/*,.pdf"
                    onChange={event => {
                      const file = event.target.files[0]
                      const type = 'prestasi'

                      uploadBukti(file, type)
                    }}
                  />
                </FormGroup>
              )}
            </>
          )}
          {registration?.jalur_pendaftaran === 'afirmasi' && (
            <>
              <FormGroup>
                <Label for="jalur_beasiswa_khusus">Jenis Beasiswa Afirmasi</Label>
                <Select
                  options={jalurBeasiswaKhususOptions}
                  placeholder='Pilih Jalur Beasiswa Afirmasi'
                  id="jalur_beasiswa_khusus"
                  name="jalur_beasiswa_khusus"
                  value={jalurBeasiswaKhususOptions.find(jalur => jalur.value === registration?.jalur_beasiswa_khusus) || null}
                  onChange={option => onChange('jalur_beasiswa_khusus', option.value)}
                />
              </FormGroup>
              
              {(registration?.jalur_beasiswa_khusus === 'dhuafa' && registration?.bukti_dhuafa) || (registration?.jalur_beasiswa_khusus === 'yatim' && registration?.bukti_yatim) ? (
                <FormGroup>
                  <Label for="bukti_prestasi">Berkas Bukti</Label>
                  <InputGroup>
                    <Input type="text" disabled value="Berkas bukti sudah tersimpan"></Input>
                    <Button
                      color="success" 
                      onClick={() => {
                        downloadBukti(registration?.bukti_prestasi)
                      }}>
                        <i className='bi-download'></i>
                    </Button>
                    <Button
                      color="danger" 
                      onClick={() => {
                        deleteBukti(registration?.jalur_beasiswa_khusus)
                      }}>
                        <i className='bi-trash'></i>
                    </Button>
                  </InputGroup>
                </FormGroup>
              ) : (
                <FormGroup>
                  {registration?.jalur_beasiswa_khusus === 'dhuafa' && (
                    <Label for="bukti_prestasi">Upload Bukti Prestasi (Sertifikat, Ijazah, dll)</Label>
                  )}
                  {registration?.jalur_beasiswa_khusus === 'yatim' && (
                    <Label for="bukti_prestasi">Upload SK Yatim Piatu dari sekolah</Label>
                  )}
                  {registration?.jalur_beasiswa_khusus && (
                    <Input 
                      className='mb-1'
                      type="file"
                      id="bukti_prestasi"
                      placeholder="Bukti"
                      accept="image/*,.pdf"
                      onChange={event => {
                        const file = event.target.files[0]
                        const type = registration?.jalur_beasiswa_khusus
                        uploadBukti(file, type)
                      }}
                    />
                  )}
                </FormGroup>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </Col>  
  )
}