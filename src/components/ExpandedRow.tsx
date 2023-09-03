import { columns } from "@/data/columns"
import { convertToTitleCase, formatDatumWithWilayahNames } from "@/utils"
import { Col, Row, Table } from "reactstrap"

export default function ExpandedRow({data}) {
  const formattedData = formatDatumWithWilayahNames(data, 1)

  return (
    <Row>
      <Col>
        <Table className="table-striped">
          <tbody>
          {columns.map(column => (
            <tr key={column}>
              <th scope="row">{convertToTitleCase(column)}</th>
              <td>:</td>
              <td>{formattedData[column]}</td>
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