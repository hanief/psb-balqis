import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRegistration } from '@/data/registration'
import { debounce } from 'lodash'
import { useUser } from '@supabase/auth-helpers-react'
import DataForm from './DataForm'
import { columnsObject } from '@/data/columns'

export default function Data() {
  const user = useUser()
  const {
    registration: remoteRegistration, 
    uploadBukti, 
    deleteBukti,
    downloadBukti,
    isUploading, 
    isLoading, 
    isValidating,
    updateRegistrationData,
  } = useRegistration()

  const [errors, setErrors] = useState(columnsObject)

  const [registration, setRegistration] = useState(columnsObject)

  const saveRegistrationData = useCallback(updateRegistrationData, [])
  const handleUpdateRegistration = useMemo(() => debounce(saveRegistrationData, 750), [saveRegistrationData])

  useEffect(() => {
    if (!remoteRegistration) return

    const newRegistration = {...registration}

    Object.keys(registration).forEach(field => {
      if (newRegistration[field] === remoteRegistration[field]) return

      newRegistration[field] = remoteRegistration[field]
    })

    setRegistration(newRegistration)
  }, [remoteRegistration])

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