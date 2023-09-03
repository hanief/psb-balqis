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
      'nomor_hp_ibu': false,
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
      if (requiredRules[field] === true) {
        if (localRegistration[field]) {
          acc[field] = localRegistration[field].length > 0
        } else {
          acc[field] = false
        }
      } else {
        acc[field] = true
      }

      return acc
    }, {})
  }, [requiredRules, localRegistration])

  const isValid = useMemo(() => {
    return Object.keys(validities).every(key => validities[key] === true)
  }, [validities])
  
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