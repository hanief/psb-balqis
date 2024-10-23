import { useEffect, useMemo, useState } from 'react'
import DataFormSantri from './DataFormSantri'
import { useRouter } from 'next/router'

export default function DataSantri({ registration, onValidityChange, onChange }) {
  const router = useRouter()
  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = useMemo(() => {
    return {
      'nama_lengkap': true,
      'nik': true,
      'jenjang': true,
      'program_jenjang': localRegistration?.jenjang === 'smp',
      'program_kelas_khusus_smp': localRegistration?.jenjang === 'smp' && localRegistration?.program_jenjang === 'boarding',
      'jenis_kelamin': true,
      'tempat_lahir': true,
      'tanggal_lahir': true,
      'asal_sekolah': true,
      'referral': true
    }
  }, [localRegistration])

  const validities = useMemo(() => {
    const valids = Object.keys(requiredRules).reduce((acc, field) => {
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

    return valids
  }, [requiredRules, localRegistration])

  const isValid = useMemo(() => {
    const valid = Object.keys(validities).every(key => validities[key] === true)
    console.log('validities' , validities)
    console.log('valid', valid)
    return valid
  }, [validities])
  
  useEffect(() => {
    if (isValid && showValiditiesWarning) {
      setShowValiditiesWarning(false)
    }

    onValidityChange(isValid)
  }, [isValid])

  function handleChange(name, value) {
    const newData = {
      ...localRegistration,
      jenjang: router.query.jenjang,
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