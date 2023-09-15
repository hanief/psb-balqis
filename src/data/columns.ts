export const columnsObject = {
  'nama_lengkap': '',
  'jenis_kelamin': '',
  'tempat_lahir': '',
  'tanggal_lahir': '',
  'asal_sekolah': '',
  'jenjang': '',
  'jalur_pendaftaran': 'reguler',
  'jalur_beasiswa': '',
  'jalur_beasiswa_khusus': '',
  'jalur_beasiswa_prestasi': '',
  'nama_prestasi': '',
  'tingkat_prestasi': '',
  'tahun_prestasi': '',
  'bukti_prestasi': '',
  'bukti_dhuafa': '',
  'bukti_yatim': '',
  'bukti_pembayaran': '',
  'pembayaran_diterima': false,
  'nama_ayah': '',
  'nomor_hp_ayah': '',
  'nama_ibu': '',
  'nomor_hp_ibu': '',
  'alamat': '',
  'provinsi': '',
  'kabupaten': '',
  'kecamatan': '',
  'desa': '',
  'kodepos': '',
  'created_at': '',
  'nilai_tahsin': '',
  'nilai_akademik': '',
  'nilai_pesantren': '',
  'status_pendaftaran': 'pending',
  'syarat_penerimaan': '',
  'catatan_internal': '',
}

export const columns = Object.keys(columnsObject)

export interface RegistrationColumn {
  'nama_lengkap': string
  'jenis_kelamin': string,
  'tempat_lahir': string,
  'tanggal_lahir': string,
  'asal_sekolah': string,
  'jenjang': string,
  'jalur_pendaftaran': string,
  'jalur_beasiswa': string,
  'jalur_beasiswa_khusus': string,
  'jalur_beasiswa_prestasi': string,
  'nama_prestasi': string,
  'tingkat_prestasi': string,
  'tahun_prestasi': string,
  'bukti_prestasi': string,
  'bukti_dhuafa': string,
  'bukti_yatim': string,
  'bukti_pembayaran': string,
  'pembayaran_diterima': boolean,
  'nama_ayah': string,
  'nomor_hp_ayah': string,
  'nama_ibu': string,
  'nomor_hp_ibu': string,
  'alamat': string,
  'provinsi': string,
  'kabupaten': string,
  'kecamatan': string,
  'desa': string,
  'kodepos': string,
  'created_at': string,
  'nilai_tahsin': string,
  'nilai_akademik': string,
  'nilai_pesantren': string,
  'status_pendaftaran': string,
  'syarat_penerimaan': string,
  'catatan_internal': string,
}