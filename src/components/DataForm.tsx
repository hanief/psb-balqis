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
import DataFormSantri from "@/components/DataFormSantri"
import DataFormWali from "@/components/DataFormWali"
import DataFormJalur from "@/components/DataFormJalur"

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
      <DataFormSantri
        registration={registration}
        rules={rules}
        validities={validities}
        onChange={onChange}
        onMultipleChanges={onMultipleChanges}
        uploadBukti={uploadBukti}
        deleteBukti={deleteBukti}
        downloadBukti={downloadBukti}
      />
      <DataFormJalur
        registration={registration}
        rules={rules}
        validities={validities}
        onChange={onChange}
        onMultipleChanges={onMultipleChanges}
        uploadBukti={uploadBukti}
        deleteBukti={deleteBukti}
        downloadBukti={downloadBukti}
      />
      <DataFormWali
        registration={registration}
        rules={rules}
        validities={validities}
        onChange={onChange}
        onMultipleChanges={onMultipleChanges}
        uploadBukti={uploadBukti}
        deleteBukti={deleteBukti}
        downloadBukti={downloadBukti}
      />
    </Row>
  )
}