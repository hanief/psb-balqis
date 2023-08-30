import { ulid } from 'ulid'
import { Wilayah } from '@/types'
import wilayah from '@/data/wilayah.json'
import { format } from 'path'


export function getRandomString() {
  return ulid()
}

export function getRandomInteger(min = 10000, max = 100000) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatDataWithWilayahNames(data) {
  return data.map((datum, index) => {
    return formatDatumWithWilayahNames(datum, index)
  })
}

export function formatDatumWithWilayahNames(datum, index) {
  const provinces = wilayah as Wilayah[]

  const provinsi = provinces.find(provinsi => provinsi.code === datum.provinsi)
  const kabupaten = provinsi?.cities.find(kabupaten => kabupaten.code === datum.kabupaten)
  const kecamatan = kabupaten?.districts.find(kecamatan => kecamatan.code === datum.kecamatan)
  const desa = kecamatan?.villages.find(desa => desa.code === datum.desa)

  return {
    no: index + 1,
    ...datum,
    provinsi: provinsi?.province,
    kabupaten: kabupaten?.city,
    kecamatan: kecamatan?.district,
    desa: desa?.village
  }
}

export function convertToTitleCase(str) {
  if (!str) return ''

  return str.replaceAll('_', ' ').replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}