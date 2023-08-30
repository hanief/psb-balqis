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
    <Row className='row-cols-1 row-cols-md-2 g-4'>
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
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Jalur Pendaftaran</CardTitle>
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
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Alamat Tempat Tinggal</CardTitle>
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
    </Row>
  )
}