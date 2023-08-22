import Select from 'react-select'
import { useCallback, useEffect, useMemo, useState } from 'react'
import data from '@/data/wilayah.json'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, InputGroup, Label, Row, Spinner } from 'reactstrap'
import { usePendaftaran } from '@/model/pendaftaran'
import { debounce } from 'lodash'
import { Wilayah } from '@/types'
import { 
  jalurPendaftaranOptions, 
  jenjangOptions, 
  jalurBeasiswaKhususOptions,
  jalurBeasiswaPrestasiOptions,
  jenisKelaminOptions
} from '@/data/options'

const provinces = data as Wilayah[]

export default function DataEdit({initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  const {singleRegistration: remoteRegistration, uploadBukti, deleteBukti, isUploading, updateRegistrationData} = usePendaftaran({
    specificUserId: initialRegistration?.user_id,
    selectedColumn: null,
    keyword: null
  })

  const [registration, setRegistration] = useState(initialRegistration || {
    jenjang: '',
    jalur_pendaftaran: '',
    jalur_beasiswa_prestasi: '',
    nama_prestasi: '',
    tingkat_prestasi: '',
    tahun_prestasi: '',
    alamat: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    kodepos: '',
    bukti_prestasi: '',
    bukti_dhuafa: '',
    bukti_yatim: '',
    bukti_pembayaran: '',
    jalur_beasiswa_khusus: '',
    nama_lengkap: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    asal_sekolah: '',
    nama_ayah: '',
    nomor_hp_ayah: '',
    nama_ibu: '',
    nomor_hp_ibu: '',
  })

  const kabupatens = useMemo(() => provinces.find(province => province.code === registration?.provinsi)?.cities, [registration?.provinsi])
  const kecamatans = useMemo(() => kabupatens?.find(kabupaten => kabupaten.code === registration?.kabupaten)?.districts, [kabupatens, registration?.kabupaten])
  const desas = useMemo(() => kecamatans?.find(kecamatan => kecamatan.code === registration?.kecamatan)?.villages, [kecamatans, registration?.kecamatan])

  const saveRegistrationData = useCallback(handleUpdateData, [])
  const handleUpdateRegistration = useMemo(() => debounce(saveRegistrationData, 1000), [saveRegistrationData])

  useEffect(() => {
    if (!remoteRegistration) return

    const newRegData = registration
    Object.keys(registration).forEach(key => {
      if (!registration[key]) {
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

  function handleMultipleRegistrationFieldChange(changes) {
    const updatedData = {}
    changes.forEach(change => {
      updatedData[change.key] = change.value
    })
    setRegistration({ ...registration, ...updatedData})
    handleUpdateRegistration(updatedData)
  }

  return (
    <Col>
      <Row className='row-cols-1 row-cols-md-2 g-4'>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5" className='mb-4'>Jalur Pendaftaran</CardTitle>
              <FormGroup>
                <Label for='jenjang'>Jenjang Sekolah</Label>
                <Select
                  options={jenjangOptions}
                  placeholder='Pilih Jenjang Sekolah'
                  required={true}
                  id="jenjang"
                  isSearchable={false}
                  name="jenjang"
                  value={jenjangOptions.find(o => o.value === registration?.jenjang)}
                  onChange={option => handleRegistrationFieldChange('jenjang', option.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='jalur_pendaftaran'>Jenis Pendaftaran</Label>
                <Select
                  options={jalurPendaftaranOptions}
                  placeholder='Pilih Jalur Pendaftaran'
                  required={true}
                  id="jalur_pendaftaran"
                  isSearchable={false}
                  name="jalur_pendaftaran"
                  value={jalurPendaftaranOptions.find(o => o.value === registration?.jalur_pendaftaran)}
                  onChange={option => handleRegistrationFieldChange('jalur_pendaftaran', option.value)}
                />
              </FormGroup>
              {registration?.jalur_pendaftaran === 'prestasi' && (
                <>
                  <FormGroup>
                    <Label for='jalur_beasiswa_prestasi'>Jenis Prestasi</Label>
                    <Select
                      options={jalurBeasiswaPrestasiOptions}
                      placeholder='Pilih Jalur Beasiswa Prestasi'
                      id="jalur_beasiswa_prestasi"
                      value={jalurBeasiswaPrestasiOptions.find(jalur => jalur.value === registration?.jalur_beasiswa_prestasi)}
                      onChange={option => handleRegistrationFieldChange('jalur_beasiswa_prestasi', option.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="nama_prestasi">Detail Prestasi</Label>
                    <Input
                      className='mb-1'
                      type="text"
                      id="nama_prestasi"
                      placeholder="Nama Prestasi"
                      value={registration?.nama_prestasi}
                      onChange={event => handleRegistrationFieldChange('nama_prestasi', event.target.value)}
                    />
                    <Input 
                      className='mb-1'
                      type="text"
                      id="tingkat_prestasi"
                      placeholder="Tingkat (cth: Kabupaten, Provinsi, Nasional)"
                      value={registration?.tingkat_prestasi}    
                      onChange={event => handleRegistrationFieldChange('tingkat_prestasi', event.target.value)}
                    />
                    <Input 
                      className='mb-1'
                      type="text"
                      id="tahun_prestasi"
                      placeholder="Tahun (cth: 2020)"
                      value={registration?.tahun_prestasi}   
                      onChange={event => handleRegistrationFieldChange('tahun_prestasi', event.target.value)}
                    />
                  </FormGroup>
                  {registration?.bukti_prestasi ? (
                    <FormGroup>
                      <Label for="bukti_prestasi">Bukti Prestasi</Label>
                      <InputGroup>
                        <Input type="text" disabled value={registration?.bukti_prestasi}></Input>
                        <Button
                          color="danger" 
                          onClick={() => {
                            deleteBukti('prestasi')
                          }}>
                            Hapus
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  ) : (
                    <>
                    {isUploading ? (
                      <>
                        <Spinner>
                          Uploading...
                        </Spinner>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <FormGroup>
                        <Label for="bukti_prestasi">Upload berkas bukti prestasi (Sertifikat, Ijazah, dll)</Label>
                        <Input 
                          className='mb-1'
                          type="file"
                          id="bukti_prestasi"
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
                      value={jalurBeasiswaKhususOptions.find(jalur => jalur.value === registration?.jalur_beasiswa_khusus)}
                      onChange={option => handleRegistrationFieldChange('jalur_beasiswa_khusus', option.value)}
                    />
                  </FormGroup>
                  
                  {(registration?.jalur_beasiswa_khusus === 'dhuafa' && registration?.bukti_dhuafa) || (registration?.jalur_beasiswa_khusus === 'yatim' && registration?.bukti_yatim) ? (
                    <FormGroup>
                      <Label for="bukti_prestasi">Berkas Bukti</Label>
                      <InputGroup>
                        <Input type="text" disabled value={registration?.jalur_beasiswa_khusus === 'dhuafa' ? registration?.bukti_dhuafa : registration?.bukti_yatim}></Input>
                        <Button
                          color="danger" 
                          onClick={() => {
                            deleteBukti(registration?.jalur_beasiswa_khusus)
                          }}>
                            Hapus
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
                          placeholder="Bukti Prestasi"
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
              <CardTitle tag="h5" className='mb-4'>Data Calon Santri</CardTitle>
              <FormGroup>
                  <Label for='nama_lengkap'>Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="nama_lengkap"
                    placeholder="cth: Ahmad Fulan"
                    required={true}
                    value={registration?.nama_lengkap}
                    onChange={event => handleRegistrationFieldChange('nama_lengkap', event.target.value)}
                  />
              </FormGroup>
              <FormGroup>
                <Label for='jenis_kelamin'>Jenis Kelamin</Label>                
                <Select
                  options={jenisKelaminOptions}
                  placeholder='Pilih Jenis Kelamin'
                  isSearchable={false}
                  required={true}
                  id="jenis_kelamin"
                  value={jenisKelaminOptions.find(o => o.value === registration?.jenis_kelamin)}
                  onChange={event => handleRegistrationFieldChange('jenis_kelamin', event.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='tempat_lahir'>Tempat dan Tanggal Lahir</Label>
                <div className='d-flex justify-content-between gap-2'>
                  <Input
                    type="text"
                    id="tempat_lahir"
                    placeholder="Tempat Lahir"
                    required={true}
                    value={registration?.tempat_lahir}
                    onChange={event => handleRegistrationFieldChange('tempat_lahir', event.target.value)}
                  />
                  <Input
                    type="date"
                    id="tanggal_lahir"
                    placeholder="Tanggal Lahir"
                    required={true}
                    value={registration?.tanggal_lahir}
                    onChange={event => handleRegistrationFieldChange('tanggal_lahir', event.target.value)}
                  />
                </div>
            </FormGroup>
            <FormGroup>
              <Label for='asal_sekolah'>Asal Sekolah</Label>
              <Input
                type="text"
                id="asal_sekolah"
                placeholder="Asal Sekolah"
                required={true}
                value={registration?.asal_sekolah}
                onChange={event => handleRegistrationFieldChange('asal_sekolah', event.target.value)}
              />
            </FormGroup>
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
                    <Input
                      className='mb-2'
                      type="text"
                      id="nama_ayah"
                      placeholder='Nama Lengkap'
                      value={registration?.nama_ayah}
                      onChange={event => handleRegistrationFieldChange('nama_ayah', event.target.value)}
                    />
                  </Col>
                  <Col lg="6">
                    <Input
                      type="text"
                      id="nomor_hp_ayah"
                      placeholder="Nomor HP (cth: +6281234567890)"
                      value={registration?.nomor_hp_ayah}
                      onChange={event => handleRegistrationFieldChange('nomor_hp_ayah', event.target.value)}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for='asal_sekolah'>Ibu / Wali 2</Label>
                <Row>
                  <Col lg="6">
                    <Input
                      className='mb-2'
                      type="text"
                      id="nama_ibu"
                      placeholder='Nama Lengkap'
                      value={registration?.nama_ibu}
                      onChange={event => handleRegistrationFieldChange('nama_ibu', event.target.value)}
                    />
                  </Col>
                  <Col lg="6">
                    <Input
                      type="text"
                      id="nomor_hp_ibu"
                      placeholder="Nomor HP (cth: +6281234567890)"
                      value={registration?.nomor_hp_ibu}
                      onChange={event => handleRegistrationFieldChange('nomor_hp_ibu', event.target.value)}
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
                <Input
                  className='mb-2'
                  label="Alamat"
                  type="text"
                  id="alamat"
                  placeholder="Jalan, RT/RW, Desa/Kelurahan"
                  value={registration?.alamat}
                  onChange={event => handleRegistrationFieldChange('alamat', event.target.value)}
                />
                <Select
                  className='mb-2'
                  id="provinsi"
                  placeholder="Pilih Provinsi"
                  options={provinces}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.province}
                  value={provinces.find(prov => prov.code === registration?.provinsi)}
                  onChange={option => handleRegistrationFieldChange('provinsi', option.code)}
                />
                <Select
                  className='mb-2'
                  id="kabupaten"
                  placeholder="Pilih Kabupaten"
                  options={kabupatens}
                  value={kabupatens?.find(kabupaten => kabupaten.code === registration?.kabupaten)}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.city}
                  onChange={option => handleRegistrationFieldChange('kabupaten', option.code)}
                />
                <Select
                  className='mb-2'
                  id="kecamatan"
                  placeholder="Pilih Kecamatan"
                  value={kecamatans?.find(kecamatan => kecamatan.code === registration?.kecamatan)}
                  options={kecamatans}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.district}
                  onChange={option => handleRegistrationFieldChange('kecamatan', option.code)}
                />
                <Select
                  className='mb-2'
                  id="desa"
                  placeholder="Pilih Desa/Kelurahan"
                  value={desas?.find(kelurahan => kelurahan.code === registration?.desa)}
                  options={desas}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.village}
                  onChange={option => {
                    handleMultipleRegistrationFieldChange([
                      {key: 'desa', value: option.code},
                      {key: 'kodepos', value: `${desas.find(village => village.code === option.code)?.postal}`}
                    ])
                  }}
                />
                <Input
                  className='mb-2'
                  label="Kode Pos"
                  type="text"
                  id="kodepos"
                  placeholder="Kode Pos"
                  value={registration?.kodepos}
                  onChange={event => handleRegistrationFieldChange('kodepos', event.target.value)}
                /> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}