import { Row } from "reactstrap"

import DataFormSantri from "@/components/DataFormSantri"
import DataFormWali from "@/components/DataFormWali"
import DataFormJalur from "@/components/DataFormJalur"

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
  return (
    <Row className='row-cols-1 row-cols-md-2 g-4'>
      <DataFormSantri
        registration={registration}
        rules={rules}
        validities={validities}
        onChange={onChange}
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
      />
    </Row>
  )
}