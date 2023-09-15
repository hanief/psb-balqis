import { useSettings } from "@/data/settings";
import { Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

export default function PengaturanPage() {
  const {settings, updateSetting} = useSettings()

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Pengaturan</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <FormGroup switch>
                <Input
                  id="status_pendaftaran"
                  name="status_pendaftaran"
                  type="switch"
                  checked={settings?.pendaftaran_buka === 'true'}
                  onChange={event => {
                    updateSetting('pendaftaran_buka', event.target.checked ? 'true' : 'false')
                  }}
                />
                <Label for="status_pendaftaran">Pendaftaran terbuka</Label>
              </FormGroup>
              {settings?.pendaftaran_buka === 'true' && (
                <>              
                  <FormGroup>
                    <Label for="mulai_pendaftaran">Tanggal Mulai Pendaftaran</Label>
                    <Input
                      id="mulai_pendaftaran"
                      name="mulai_pendaftaran"
                      type="date"
                      value={settings?.mulai_pendaftaran}
                      onBlur={event => {
                        updateSetting('mulai_pendaftaran', event.target.value)
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="akhir_pendaftaran">Tanggal Mulai Pendaftaran</Label>
                    <Input
                      id="akhir_pendaftaran"
                      name="akhir_pendaftaran"
                      type="date"
                      value={settings?.akhir_pendaftaran}
                      onBlur={event => {
                        updateSetting('akhir_pendaftaran', event.target.value)
                      }}
                    />
                  </FormGroup>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}