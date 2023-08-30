import { columns } from "@/data/columns"
import { convertToTitleCase, formatDatumWithWilayahNames } from "@/utils"

export default function ExpandedComponent({data}) {
  const formattedData = formatDatumWithWilayahNames(data, 1)

  return (
    <table className="table table-striped m-2">
      <tbody>
      {columns.map(column => (
        <tr key={column}>
          <th scope="row">{convertToTitleCase(column)}</th>
          <td>:</td>
          <td>{formattedData[column]}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}