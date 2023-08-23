import Login from "@/components/Login"
import { Col, Container, Row } from "reactstrap"

export default function LoginPage() {
  return (
    <Container>
      <Row className='justify-content-center mb-6'>
          <Col sm="6">
          <h1>Masuk</h1>
          <Login />
        </Col>
      </Row>
    </Container>
  )
}