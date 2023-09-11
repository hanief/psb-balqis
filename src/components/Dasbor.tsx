import { Col, Container, Row } from "reactstrap";
import { useUser } from "@supabase/auth-helpers-react";

export default function Dasbor() {
  const user = useUser()

  if (user?.email !== 'admin@utama.app') {
    return (
      <Container fluid>
        <Row>
          <Col>
            Sorry, you don&apos;t have access rights to this page.
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Selamat datang</h1>
        </Col>
      </Row>
    </Container>
  )
}