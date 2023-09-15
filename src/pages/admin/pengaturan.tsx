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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}