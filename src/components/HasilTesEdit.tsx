import { Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { statusPenerimaanOptions } from "@/data/options";
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"),{ ssr: false })

export default function HasilTesEdit({registration, onChange}) {
  return (
    <Row className='row-cols-1 row-cols-md-2 g-4'>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Pelaksanaan Tes</CardTitle>
            <FormGroup>
              <Label for='status_terdaftar_text'>Catatan Personal Tes</Label>
              <MDEditor
                height={500}
                value={registration?.status_terdaftar_text}
                onChange={newContent => {
                  onChange('status_terdaftar_text', newContent)
                }}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Hasil Tes</CardTitle>
            <FormGroup>
              <Label for='nilai_tahsin'>Nilai Tahsin / Tahfiz</Label>
              <Input
                type="text"
                id="nilai_tahsin"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_tahsin}
                onChange={event => onChange('nilai_tahsin', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='nilai_akademik'>Nilai Akademik</Label>
              <Input
                type="text"
                id="nilai_akademik"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_akademik}
                onChange={event => onChange('nilai_akademik', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='nilai_pesantren'>Nilai Pesantren</Label>
              <Input
                type="text"
                id="nilai_pesantren"
                placeholder="cth: 100"
                required={true}
                value={registration?.nilai_pesantren}
                onChange={event => onChange('nilai_pesantren', event.target.value)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Catatan Khusus Internal</CardTitle>
            <FormGroup>
              <Label for='catatan_internal'>Catatan Khusus Internal</Label>
              <Input
                id="catatan_internal"
                name="catatan_internal"
                type="textarea"
                required={true}
                value={registration?.catatan_internal}
                onChange={event => onChange('catatan_internal', event.target.value)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className='mb-4'>Keputusan</CardTitle>
            <FormGroup>
              <Label for='status_pendaftaran'>Status Pendaftaran</Label>
              <Select
                options={statusPenerimaanOptions}
                placeholder='Penerimaan'
                isSearchable={false}
                required={true}
                id="status_pendaftaran"
                value={statusPenerimaanOptions.find(o => o.value === registration?.status_pendaftaran)}
                onChange={event => onChange('status_pendaftaran', event.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='syarat_penerimaan'>Syarat Penerimaan</Label>
              <MDEditor
                height={500}
                value={registration?.syarat_penerimaan}
                onChange={newContent => {
                  onChange('syarat_penerimaan', newContent)
                }}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}