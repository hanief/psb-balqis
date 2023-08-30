import DataForm from '@/components/DataForm'

export default function DataEdit({
  registration,
  change,
  changeMultiple,
  uploadBukti, 
  deleteBukti, 
  downloadBukti
}) {
  return (
    <DataForm
      registration={registration}
      onChange={change}
      onMultipleChanges={changeMultiple}
      downloadBukti={downloadBukti}
      deleteBukti={deleteBukti}
      uploadBukti={uploadBukti}
    />
  )
}