import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePendaftaran } from '@/data/pendaftaran'
import { debounce } from 'lodash'
import DataForm from '@/components/DataForm'
import { columnsObject } from '@/data/columns'

export default function DataEdit({initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  const {
    singleRegistration: remoteRegistration,
    uploadBukti, 
    deleteBukti, 
    isUploading, 
    downloadBukti
  } = usePendaftaran({
    specificUserId: initialRegistration?.user_id,
    selectedColumn: null,
    keyword: null,
    showDeleted: false
  })

  const [registration, setRegistration] = useState(initialRegistration || columnsObject)

  const saveRegistrationData = useCallback(handleUpdateData, [])
  const handleUpdateRegistration = useMemo(() => debounce(saveRegistrationData, 750), [saveRegistrationData])

  useEffect(() => {
    if (!remoteRegistration) return

    const newRegData = registration
    Object.keys(registration).forEach(key => {
      if (registration[key] !== remoteRegistration[key]) {
        newRegData[key] = remoteRegistration[key]
      }
    })
    setRegistration(newRegData)
  }, [remoteRegistration])

  function handleUpdateData(data) {
    updateSpecificRegistrationData(initialRegistration?.user_id, data)

    if (!onUpdate) return
    
    onUpdate(data)
  }
  
  function handleRegistrationFieldChange(key, value) {
    const updatedData = {[key]: value}
    setRegistration({ ...registration, ...updatedData})
    handleUpdateRegistration(updatedData)
  }

  function handleMultipleRegistrationFieldChange(changes) {
    const updatedData = {}
    changes.forEach(change => {
      updatedData[change.key] = change.value
    })
    setRegistration({ ...registration, ...updatedData})
    handleUpdateRegistration(updatedData)
  }

  return (
    <DataForm
      registration={registration}
      handleRegistrationFieldChange={handleRegistrationFieldChange}
      handleMultipleRegistrationFieldChange={handleMultipleRegistrationFieldChange}
      downloadBukti={downloadBukti}
      deleteBukti={deleteBukti}
      isUploading={isUploading}
      uploadBukti={uploadBukti}
    />
  )
}