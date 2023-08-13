import Select from 'react-select'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import data from '@/data/wilayah.json'
import { Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useRegistration } from '@/model/registration'
import { debounce } from 'lodash'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

interface Wilayah {
  code: string
  province: string
  slug: string
  cities: {
    code: string
    city: string
    slug: string
    districts: {
      code: string
      district: string
      slug: string
      villages: {
        code: string
        postal: number
        village: string
        slug: string
        latitude: number
        longitude: number
        elevation: number
        geometry: boolean
      }[]
    }[]
  }[]
}

const provinces: Wilayah[] = data as Wilayah[]

const jalurPendaftaranOptions = [
  { value: 'reguler', label: 'Jalur Mandiri' },
  { value: 'beasiswa', label: 'Jalur Beasiswa' },
]

const jenisKelaminOptions = [
  { value: 'laki-laki', label: 'Laki-laki' },
  { value: 'perempuan', label: 'Perempuan' },
]

const jalurBeasiswaOptions = [
  { value: 'prestasi', label: 'Prestasi' },
  { value: 'khusus', label: 'Khusus' },
  { value: 'alumni', label: 'Alumni' },
]

const jalurBeasiswaPrestasiOptions = [
  { value: 'tiga besar', label: 'Peringkat 3 besar kelas' },
  { value: 'hafidz 15 juz', label: 'Hafidz 15 Juz (SMP)' },
  { value: 'hafidz 30 juz', label: 'Hafidz 30 Juz (SMA)' },
  { value: 'tiga besar lomba', label: 'Juara 3 besar Lomba MTQ/OSN/Olimpiade semua cabang' },
]

const jalurBeasiswaKhususOptions = [
  { value: 'dhuafa', label: 'Dhuafa berprestasi' },
  { value: 'yatimpiatu', label: 'Yatim & Piatu' },
]
  
export default function Data({onSuccess}) {
  const {registration, isLoading, updateRegistrationData} = useRegistration()
  const [isian, setIsian] = useState(null)
  const [bukti, setBukti] = useState([{
    nama: '',
    tingkat: '',
    tahun: '',
    berkas: []
  }])

  const kabupatens = useMemo(() => provinces.find(province => province.code === isian?.provinsi)?.cities, [isian?.provinsi])
  const kecamatans = useMemo(() => kabupatens?.find(kabupaten => kabupaten.code === isian?.kabupaten)?.districts, [kabupatens, isian?.kabupaten])
  const desas = useMemo(() => kecamatans?.find(kecamatan => kecamatan.code === isian?.kecamatan)?.villages, [kecamatans, isian?.kecamatan])

  const saveData = useCallback(updateRegistrationData, [])

  const handleUpdateIsian = useMemo(() => debounce(saveData, 1000), [saveData])

  useEffect(() => {
    if (isLoading) return
    if (!registration) return

    if (!isian) {
      const {id, user_id, created_at, updated_at, ...rest} = registration
      setIsian(rest)
    }
  }, [isLoading, registration])

  function handleFieldChange(key, value) {
    const updatedData = {[key]: value}
    setIsian({ ...isian, ...updatedData})
    handleUpdateIsian(updatedData)
  }

  function handleMultipleFieldChange(changes) {
    const updatedData = {}
    changes.forEach(change => {
      updatedData[change.key] = change.value
    })
    setIsian({ ...isian, ...updatedData})
    handleUpdateIsian(updatedData)
  }

  return (
    <Col>
      <Row className='row-cols-1 row-cols-md-2 g-4'>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5" className='mb-4'>Jalur Pendaftaran</CardTitle>
              <FormGroup>
                <Label for='jalur_pendaftaran'>Tipe Pendaftaran</Label>
                <Select
                  options={jalurPendaftaranOptions}
                  placeholder='Pilih Jalur Pendaftaran'
                  required={true}
                  id="jalur_pendaftaran"
                  isSearchable={false}
                  name="jalur_pendaftaran"
                  value={jalurPendaftaranOptions.find(o => o.value === isian?.jalur_pendaftaran)}
                  onChange={option => handleFieldChange('jalur_pendaftaran', option.value)}
                />
              </FormGroup>
              {isian?.jalur_pendaftaran === 'beasiswa' && (
                <>
                  <FormGroup>
                    <Label for='jalur_beasiswa'>Tipe Beasiswa</Label>
                    <Select
                      options={jalurBeasiswaOptions}
                      placeholder='Pilih Jalur Beasiswa'
                      id="jalur_beasiswa"
                      value={jalurBeasiswaOptions.find(jalur => jalur.value === isian?.jalur_beasiswa)}
                      onChange={option => handleFieldChange('jalur_beasiswa', option.value)}
                    />
                  </FormGroup>
                  {isian?.jalur_beasiswa === 'prestasi' && (
                    <>
                      <FormGroup>
                        <Label for='jalur_beasiswa_prestasi'>Tipe Prestasi</Label>
                        <Select
                          options={jalurBeasiswaPrestasiOptions}
                          placeholder='Pilih Jalur Beasiswa Prestasi'
                          id="jalur_beasiswa_prestasi"
                          value={jalurBeasiswaPrestasiOptions.find(jalur => jalur.value === isian?.jalur_beasiswa_prestasi)}
                          onChange={option => handleFieldChange('jalur_beasiswa_prestasi', option.value)}
                        />
                      </FormGroup>
                      {bukti?.map((bukti, index) => (
                        <Fragment key={index}>
                          <FormGroup>
                            <Label for="nama_prestasi">Detail Prestasi</Label>
                            <Input
                              className='mb-1'
                              type="text"
                              id="nama_prestasi"
                              placeholder="Nama Prestasi"
                              required={true}
                              value={bukti.nama}
                              onChange={(e) => setIsian({ ...isian, bukti_beasiswa: [
                                ...isian?.bukti_beasiswa.slice(0, index), 
                                { ...bukti, nama: e.target.value },
                                ...isian?.bukti_beasiswa.slice(index + 1)
                              ]})}
                            />
                            <Input 
                              className='mb-1'
                              label="Tingkat Prestasi"
                              type="text"
                              id="tingkatPrestasi"
                              placeholder="Tingkat (cth: Provinsi, Nasional)"
                              isRequired={true}
                              value={bukti.tingkat}
                              onChange={(e) => setIsian({ ...isian, bukti_beasiswa: [
                                ...isian?.bukti_beasiswa.slice(0, index), 
                                { ...bukti, tingkat: e.target.value },
                                ...isian?.bukti_beasiswa.slice(index + 1)
                              ]})}
                            />
                            <Input 
                              className='mb-1'
                              label="Tahun Prestasi"
                              type="text"
                              id="tahunPrestasi"
                              placeholder="Tahun"
                              isRequired={true}
                              value={bukti.tahun}
                              onChange={(e) => setIsian({ ...isian, bukti_beasiswa: [
                                ...isian?.bukti_beasiswa.slice(0, index), 
                                { ...bukti, tahun: e.target.value },
                                ...isian?.bukti_beasiswa.slice(index + 1)
                              ]})}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="bukti_prestasi">Upload Bukti (Sertifikat, Ijazah, dll)</Label>
                            <Input 
                              className='mb-1'
                              label="Bukti Prestasi"
                              type="file"
                              id="buktiPrestasi"
                              placeholder="Bukti Prestasi"
                              isRequired={true}
                              value={bukti.berkas}
                              onChange={(e) => setIsian({ ...isian, bukti_beasiswa: [
                                ...isian?.bukti_beasiswa.slice(0, index), 
                                { ...bukti, bukti: e.target.value },
                                ...isian?.bukti_beasiswa.slice(index + 1)
                              ]})}
                            />
                          </FormGroup>
                          
                        </Fragment>
                      ))}
                    </>
                  )}
                  {isian?.jalur_beasiswa === 'khusus' && (
                    <Select
                      options={jalurBeasiswaKhususOptions}
                      placeholder='Pilih Jalur Beasiswa Khusus'
                      id="jalur_beasiswa_khusus"
                      value={jalurBeasiswaKhususOptions.find(jalur => jalur.value === isian?.jalur_beasiswa_khusus)}
                      onChange={option => handleFieldChange('jalur_beasiswa_khusus', option.value)}
                    />
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </Col>  
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5" className='mb-4'>Data Anak</CardTitle>
              <FormGroup>
                  <Label for='nama_lengkap'>Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="nama_lengkap"
                    placeholder="cth: Fulan bin Fulan"
                    required={true}
                    value={isian?.nama_lengkap}
                    onChange={event => handleFieldChange('nama_lengkap', event.target.value)}
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
                  value={jenisKelaminOptions.find(o => o.value === isian?.jenis_kelamin)}
                  onChange={event => handleFieldChange('jenis_kelamin', event.value)}
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
                    value={isian?.tempat_lahir}
                    onChange={event => handleFieldChange('tempat_lahir', event.target.value)}
                  />
                  <Input
                    type="date"
                    id="tanggal_lahir"
                    placeholder="Tanggal Lahir"
                    required={true}
                    value={isian?.tanggal_lahir}
                    onChange={event => handleFieldChange('tanggal_lahir', event.target.value)}
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
                value={isian?.asal_sekolah}
                onChange={event => handleFieldChange('asal_sekolah', event.target.value)}
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
                      value={isian?.nama_ayah}
                      onChange={event => handleFieldChange('nama_ayah', event.target.value)}
                    />
                  </Col>
                  <Col lg="6">
                    <Input
                      type="text"
                      id="nomor_hp_ayah"
                      placeholder="Nomor HP (cth: +6281234567890)"
                      value={isian?.nomor_hp_ayah}
                      onChange={event => handleFieldChange('nomor_hp_ayah', event.target.value)}
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
                      value={isian?.nama_ibu}
                      onChange={event => handleFieldChange('nama_ibu', event.target.value)}
                    />
                  </Col>
                  <Col lg="6">
                    <Input
                      type="text"
                      id="nomor_hp_ibu"
                      placeholder="Nomor HP (cth: +6281234567890)"
                      value={isian?.nomor_hp_ibu}
                      onChange={event => handleFieldChange('nomor_hp_ibu', event.target.value)}
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
                  value={isian?.alamat}
                  onChange={event => handleFieldChange('alamat', event.target.value)}
                />
                <Select
                  className='mb-2'
                  id="provinsi"
                  placeholder="Pilih Provinsi"
                  options={provinces}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.province}
                  value={provinces.find(prov => prov.code === isian?.provinsi)}
                  onChange={option => handleFieldChange('provinsi', option.code)}
                />
                <Select
                  className='mb-2'
                  id="kabupaten"
                  placeholder="Pilih Kabupaten"
                  options={kabupatens}
                  value={kabupatens?.find(kabupaten => kabupaten.code === isian?.kabupaten)}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.city}
                  onChange={option => handleFieldChange('kabupaten', option.code)}
                />
                <Select
                  className='mb-2'
                  id="kecamatan"
                  placeholder="Pilih Kecamatan"
                  value={kecamatans?.find(kecamatan => kecamatan.code === isian?.kecamatan)}
                  options={kecamatans}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.district}
                  onChange={option => handleFieldChange('kecamatan', option.code)}
                />
                <Select
                  className='mb-2'
                  id="desa"
                  placeholder="Pilih Desa/Kelurahan"
                  value={desas?.find(kelurahan => kelurahan.code === isian?.desa)}
                  options={desas}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => option.village}
                  onChange={option => {
                    handleMultipleFieldChange([
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
                  value={isian?.kodepos}
                  onChange={event => handleFieldChange('kodepos', event.target.value)}
                /> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}