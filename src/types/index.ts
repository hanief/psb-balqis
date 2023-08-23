export interface Wilayah {
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

export interface RegistrationData {
  jenjang: string
  jalur_pendaftaran: string
  jalur_beasiswa_prestasi: string
  nama_prestasi: string
  tingkat_prestasi: string
  tahun_prestasi: string
  alamat: string
  provinsi: string
  kabupaten: string
  kecamatan: string
  desa: string
  kodepos: string
  bukti_prestasi: string
  bukti_dhuafa: string
  bukti_yatim: string
  bukti_pembayaran: string
  jalur_beasiswa_khusus: string
  nama_lengkap: string
  jenis_kelamin: string
  tempat_lahir: string
  tanggal_lahir: string
  asal_sekolah: string
  nama_ayah: string
  nomor_hp_ayah: string
  nama_ibu: string
  nomor_hp_ibu: string
}