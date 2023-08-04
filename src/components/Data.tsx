import Input from '@/components/Input'
import Select from '@/components/Select'
import { Fragment, useState } from 'react'
import wilayah from '@/data/wilayah.json'
import { Button, Form } from 'reactstrap'

export default function Data({onSuccess}) {
  const [isian, setIsian] = useState({
    jalurPendaftaran: '',
    jalurBeasiswa: '',
    jalurBeasiswaPrestasi: '',
    buktiBeasiswa: [{
      nama: '',
      tingkat: '',
      tahun: '',
      bukti: '',
    }],
    jalurBeasiswaKhusus: '',
    namaLengkap: '',
    nomorHandphone: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    asalSekolah: '',
    namaAyah: '',
    nomorHpAyah: '',
    namaIbu: '',
    nomorHpIbu: '',
    namaWali: '',
    nomorHpWali: '',
    alamat: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    kodepos: '',
  })
  
  return (
    <div>
      <h1>Pendaftaran Siswa Baru</h1>
      <Form>
        <Select
          options={[
            { value: 'reguler', label: 'Jalur Reguler' },
            { value: 'beasiswa', label: 'Jalur Beasiswa' },
          ]}
          label="Jalur Pendaftaran"
          placeholder='Pilih Jalur Pendaftaran'
          isRequired={true}
          id="jalurPendaftaran"
          value={isian.jalurPendaftaran}
          onChange={(e) => setIsian({ ...isian, jalurPendaftaran: e.target.value })}
        />
        {isian.jalurPendaftaran === 'beasiswa' && (
          <>
            <Select
              options={[
                { value: 'prestasi', label: 'Prestasi' },
                { value: 'khusus', label: 'Khusus' },
                { value: 'alumni', label: 'Alumni' },
              ]}
              label="Pilihan Beasiswa"
              placeholder='Pilih Jalur Beasiswa'
              id="jalurBeasiswa"
              value={isian.jalurBeasiswa}
              onChange={e => {
                setIsian({
                  ...isian, 
                  jalurBeasiswa: e.target.value ,
                  buktiBeasiswa: [
                    ...isian.buktiBeasiswa,
                  ]}
                )}
              }
            />
            {isian.jalurBeasiswa === 'prestasi' && (
              <>
                <Select
                  options={[
                    { value: 'tigaBesar', label: 'Peringkat 3 besar kelas' },
                    { value: 'hafidz15juz', label: 'Hafidz 15 Juz (SMP)' },
                    { value: 'hafidz30juz', label: 'Hafidz 30 Juz (SMA)' },
                    { value: 'tigaBesarLomba', label: 'Juara 3 besar Lomba MTQ/OSN/Olimpiade semua cabang' },
                  ]}
                  label="Pilihan Beasiswa Prestasi"
                  placeholder='Pilih Jalur Beasiswa Prestasi'
                  id="jalurBeasiswaPrestasi"
                  value={isian.jalurBeasiswaPrestasi}
                  onChange={(e) => setIsian({ ...isian, jalurBeasiswaPrestasi: e.target.value })}
                />
                {isian.buktiBeasiswa.map((bukti, index) => (
                  <Fragment key={index}>
                    <Input 
                      label="Nama Prestasi"
                      type="text"
                      id="namaPrestasi"
                      placeholder="Nama Prestasi"
                      isRequired={true}
                      value={bukti.nama}
                      onChange={(e) => setIsian({ ...isian, buktiBeasiswa: [
                        ...isian.buktiBeasiswa.slice(0, index), 
                        { ...bukti, nama: e.target.value },
                        ...isian.buktiBeasiswa.slice(index + 1)
                      ]})}
                    />
                    <Input 
                      label="Tingkat Prestasi"
                      type="text"
                      id="tingkatPrestasi"
                      placeholder="Tingkat Prestasi"
                      isRequired={true}
                      value={bukti.tingkat}
                      onChange={(e) => setIsian({ ...isian, buktiBeasiswa: [
                        ...isian.buktiBeasiswa.slice(0, index), 
                        { ...bukti, tingkat: e.target.value },
                        ...isian.buktiBeasiswa.slice(index + 1)
                      ]})}
                    />
                    <Input 
                      label="Tahun Prestasi"
                      type="text"
                      id="tahunPrestasi"
                      placeholder="Tingkat Prestasi"
                      isRequired={true}
                      value={bukti.tahun}
                      onChange={(e) => setIsian({ ...isian, buktiBeasiswa: [
                        ...isian.buktiBeasiswa.slice(0, index), 
                        { ...bukti, tahun: e.target.value },
                        ...isian.buktiBeasiswa.slice(index + 1)
                      ]})}
                    />
                    <Input 
                      label="Bukti Prestasi"
                      type="file"
                      id="buktiPrestasi"
                      placeholder="Bukti Prestasi"
                      isRequired={true}
                      value={bukti.bukti}
                      onChange={(e) => setIsian({ ...isian, buktiBeasiswa: [
                        ...isian.buktiBeasiswa.slice(0, index), 
                        { ...bukti, bukti: e.target.value },
                        ...isian.buktiBeasiswa.slice(index + 1)
                      ]})}
                    />
                  </Fragment>
                ))}
              </>
            )}
            {isian.jalurBeasiswa === 'khusus' && (
              <Select
                options={[
                  { value: 'dhuafa', label: 'Dhuafa berprestasi' },
                  { value: 'yatimpiatu', label: 'Yatim & Piatu' },
                ]}
                label="Pilihan Beasiswa Khusus"
                placeholder='Pilih Jalur Beasiswa Khusus'
                id="jalurBeasiswaKhusus"
                value={isian.jalurBeasiswaKhusus}
                onChange={(e) => setIsian({ ...isian, jalurBeasiswaKhusus: e.target.value })}
              />
            )}
          </>
        )}
        <Input 
          label="Nama Lengkap"
          type="text"
          id="namaLengkap"
          placeholder="Nama Lengkap"
          isRequired={true}
          value={isian.namaLengkap}
          onChange={e => setIsian({ ...isian, namaLengkap: e.target.value })}
        />
        <Input
          label="Nomor Handphone"
          type="text"
          id="nomorHandphone"
          placeholder="Nomor Handphone"
          isRequired={true}
          value={isian.nomorHandphone}
          onChange={e => setIsian({ ...isian, nomorHandphone: e.target.value })}
        />
        <Input
          label="Tempat Lahir"
          type="text"
          id="tempatLahir"
          placeholder="Tempat Lahir"
          isRequired={true}
          value={isian.tempatLahir}
          onChange={(e) => setIsian({ ...isian, tempatLahir: e.target.value })}
        />
        <Input
          label="Tanggal Lahir"
          type="date"
          id="tanggalLahir"
          placeholder="Tanggal Lahir"
          isRequired={true}
          value={isian.tanggalLahir}
          onChange={(e) => setIsian({ ...isian, tanggalLahir: e.target.value })}
        />
        <Select
          options={[
            { value: 'lakilaki', label: 'Laki-laki' },
            { value: 'perempuan', label: 'Perempuan' },
          ]}
          label="Jenis Kelamin"
          placeholder='Pilih Jenis Kelamin'
          isRequired={true}
          id="jenisKelamin"
          value={isian.jenisKelamin}
          onChange={(e) => setIsian({ ...isian, jenisKelamin: e.target.value })}
        />
        <Input
          label="Asal Sekolah"
          type="text"
          id="asalSekolah"
          placeholder="Asal Sekolah"
          isRequired={true}
          value={isian.asalSekolah}
          onChange={(e) => setIsian({ ...isian, asalSekolah: e.target.value})}
        />
        <Input
          label="Nama Ayah"
          type="text"
          id="namaAyah"
          placeholder="Nama Ayah"
          isRequired={true}
          value={isian.namaAyah}
          onChange={(e) => setIsian({ ...isian, namaAyah: e.target.value})}
        />
        <Input
          label="Nomor HP Ayah"
          type="text"
          id="nomorHpAyah"
          placeholder="Nomor HP Ayah"
          value={isian.nomorHpAyah}
          onChange={(e) => setIsian({ ...isian, nomorHpAyah: e.target.value})}

        />
        <Input
          label="Nama Ibu"
          type="text"
          id="namaIbu"
          placeholder="Nama Ibu"
          isRequired={true}
          value={isian.namaIbu}
          onChange={(e) => setIsian({ ...isian, namaIbu: e.target.value})}
        />
        <Input
          label="Nomor HP Ibu"
          type="text"
          id="nomorHpIbu"
          placeholder="Nomor HP Ibu"
          value={isian.nomorHpIbu}
          onChange={(e) => setIsian({ ...isian, nomorHpIbu: e.target.value})}
        />
        <Input
          label="Nama Wali"
          type="text"
          id="namaWali"
          placeholder="Nama Wali"
          value={isian.namaWali}
          onChange={(e) => setIsian({ ...isian, namaWali: e.target.value})}
        />
        <Input
          label="Nomor HP Wali"
          type="text"
          id="nomorHpWali"
          placeholder="Nomor HP Wali"
          value={isian.nomorHpWali}
          onChange={(e) => setIsian({ ...isian, nomorHpWali: e.target.value})}
        />
        <Input
          label="Alamat"
          type="text"
          id="alamat"
          placeholder="Jalan, RT/RW, Desa/Kelurahan"
          value={isian.alamat}
          onChange={(e) => setIsian({ ...isian, alamat: e.target.value})}
        />
        <Select
          label="Provinsi"
          id="provinsi"
          placeholder="Pilih Provinsi"
          value={isian.provinsi}
          options={wilayah.map((provinsi) => ({
            value: provinsi.code,
            label: provinsi.province,
          }))}
          onChange={(e) => setIsian({ ...isian, provinsi: e.target.value})}
        />
        <Select
          label="Kabupaten"
          id="kabupaten"
          placeholder="Pilih Kabupaten"
          value={isian.kabupaten}
          options={wilayah.find(prov => prov.code === isian.provinsi)?.
            cities.map((kabupaten) => ({
            value: kabupaten.code,
            label: kabupaten.city,
          }))}
          onChange={(e) => setIsian({ ...isian, kabupaten: e.target.value})}
        />
        <Select
          label="Kecamatan"
          id="kecamatan"
          placeholder="Pilih Kecamatan"
          value={isian.kecamatan}
          options={wilayah.find(prov => prov.code === isian.provinsi)?.
            cities.find(city => city.code === isian.kabupaten)?.
            districts.map((kecamatan) => ({
            value: kecamatan.code,
            label: kecamatan.district,
          }))}
          onChange={(e) => setIsian({ ...isian, kecamatan: e.target.value})}
        />
        <Select
          label="Desa/Kelurahan"
          id="desa"
          placeholder="Pilih Desa/Kelurahan"
          value={isian.desa}
          options={wilayah.find(prov => prov.code === isian.provinsi)?.
            cities.find(city => city.code === isian.kabupaten)?.
            districts.find(district => district.code === isian.kecamatan)?.
            villages.map((desa) => ({
              value: desa.code,
              label: desa.village,
          }))}
          onChange={(e) => setIsian({ 
            ...isian,
            desa: e.target.value,
            kodepos: `${wilayah.find(prov => prov.code === isian.provinsi)?.
            cities.find(city => city.code === isian.kabupaten)?.
            districts.find(district => district.code === isian.kecamatan)?.
            villages.find(village => village.code === e.target.value)?.postal}`,
          })}
        />
        <Input
          label="Kode Pos"
          type="text"
          id="kodepos"
          placeholder="Isi Kode Pos"
          value={isian.kodepos}
          onChange={(e) => setIsian({ ...isian, kodepos: e.target.value})}
        />

        <Button
          block
          size='lg'
          color="primary"
          type="submit" 
          onClick={e => {
            e.preventDefault()
            console.log('saving', isian)
            onSuccess()
          }}
        >
          Simpan
        </Button>
      </Form>
    </div>
  )
}