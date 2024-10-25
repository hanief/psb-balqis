import { columns } from "@/data/columns"
import { convertToTitleCase, formatDatumWithWilayahNames } from "@/utils/utils"
import { Col, Row, Table } from "reactstrap"

export default function ExpandedRow({data}) {
  return (
    <Row>
      <Col>
        <Table className="table-striped">
          <tbody>
          {columns.map(column => (
            <tr key={column}>
              <th scope="row">{convertToTitleCase(column)}</th>
              <td>:</td>
              <td>{data[column]}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
      <Col className="flex-grow-1">
      </Col>
    </Row>
  )
}