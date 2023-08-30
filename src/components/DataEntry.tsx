import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRegistration } from '@/data/registration'
import { debounce } from 'lodash'
import { useUser } from '@supabase/auth-helpers-react'
import DataForm from './DataForm'
import { columnsObject, columnsValidationSchema } from '@/data/columns'

export default function DataEntry() {
  const user = useUser()
  const {
    registration: remoteRegistration, 
    uploadBukti, 
    deleteBukti,
    downloadBukti,
    isUploading,
    updateRegistrationData,
  } = useRegistration()

  const [registration, setRegistration] = useState(columnsObject)

  const saveRegistrationData = useCallback(updateRegistrationData, [updateRegistrationData])
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

  // const errors = useMemo(() => {
  //   const newErrors = columnsObject

  //   try {
  //     columnsValidationSchema.validateSync(registration, {abortEarly: false})
  //   } catch (err) {
  //     err.inner.forEach(error => {
  //       newErrors[error.path] = error.message
  //     })
  //   }  

  //   return newErrors
  // }, [registration])

  function handleFieldUpdate(key, value) {
    const updatedData = {[key]: value}
    setRegistration({ ...registration, ...updatedData})
    handleUpdateRegistration(updatedData)
  }

  function handleMultipleFieldUpdate(changes) {
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
      handleFieldUpdate={handleFieldUpdate}
      handleRegistrationFieldChange={handleFieldUpdate}
      handleMultipleRegistrationFieldChange={handleMultipleFieldUpdate}
      downloadBukti={downloadBukti}
      deleteBukti={deleteBukti}
      isUploading={isUploading}
      uploadBukti={uploadBukti}
    />
  )
}