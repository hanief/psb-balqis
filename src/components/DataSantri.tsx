import { useEffect, useMemo, useState } from 'react'
import DataFormSantri from './DataFormSantri'

export default function DataSantri({ registration, onValidityChange, onChange }) {
  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = {
    'nama_lengkap': true,
    'jenjang': true,
    'jenis_kelamin': true,
    'tempat_lahir': true,
    'tanggal_lahir': true,
    'asal_sekolah': true,
  }

  const validities = useMemo(() => {
    return Object.keys(requiredRules).reduce((acc, field) => {
      acc[field] = requiredRules[field] && localRegistration && localRegistration[field].length > 0
      return acc
    }, {})
  }, [localRegistration])

  const isValid = useMemo(() => {
    return getValidity(localRegistration)
  }, [localRegistration])

  useEffect(() => {
    if (isValid && showValiditiesWarning) {
      setShowValiditiesWarning(false)
    }

    onValidityChange(isValid)
  }, [isValid])

  function getValidity(data) {
     return Object.keys(requiredRules).every(field => {
      if (!requiredRules[field]) return true

      return data && data[field]
    })
  }

  function handleChange(name, value) {
    const newData = {
      ...localRegistration,
      [name]: value
    }

    setLocalRegistration(newData)

    onChange(name, value)
  }

  return (
    <>
      <DataFormSantri
        registration={registration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
      />
    </> 
  )
}