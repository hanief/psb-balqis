import { useEffect, useMemo, useState } from 'react'
import DataFormWali from './DataFormWali'

export default function Data({
  registration, 
  onChange, 
  onChangeMultiple, 
  onValidityChange
}) {

  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = useMemo(() => {
    return {
      'nama_ayah': true,
      'nomor_hp_ayah': true,
      'nama_ibu': true,
      'nomor_hp_ibu': true,
      'alamat': true,
      'provinsi': true,
      'kabupaten': true,
      'kecamatan': true,
      'desa': true,
      'kodepos': true
    }
  }, [localRegistration])

  useEffect(() => {
    setLocalRegistration(registration)
  }, [registration])

  const validities = useMemo(() => {
    return Object.keys(requiredRules).reduce((acc, field) => {
      acc[field] = requiredRules[field] && localRegistration && localRegistration[field]
      return acc
    }, {})
  }, [localRegistration])

  const isValid = useMemo(() => {
    return Object.keys(requiredRules).every(field => {
      if (!requiredRules[field]) return true

      return localRegistration && localRegistration[field]
    })
  }, [localRegistration])
  
  useEffect(() => {
    if (isValid && showValiditiesWarning) {
      setShowValiditiesWarning(false)
    }

    onValidityChange(isValid)
  }, [isValid])

  function handleChange(name, value) {
    setLocalRegistration({
      ...localRegistration,
      [name]: value
    })

    onChange(name, value)
  } 
  
  function handleMultipleChanges(changes) {
    console.log('changes', changes)
    const newRegistration = {}
    changes.forEach(change => {
      newRegistration[change.key] = change.value
    })

    setLocalRegistration({
      ...localRegistration,
      ...newRegistration
    })

    onChangeMultiple(changes)
  }

  return (
    <>
      <DataFormWali
        registration={registration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
        onMultipleChanges={handleMultipleChanges}
      />
    </> 
  )
}