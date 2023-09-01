import { useEffect, useMemo, useState } from 'react'
import { useSingleRegistration } from '@/data/singleRegistration'
import { useUser } from '@supabase/auth-helpers-react'
import DataFormSantri from './DataFormSantri'

export default function DataSantri({onValidityChange, onDataChange}) {
  const user = useUser()

  const {
    registration, 
  } = useSingleRegistration(user?.id)

  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState({
    'nama_lengkap': '',
    'jenjang': '',
    'jenis_kelamin': '',
    'tempat_lahir': '',
    'tanggal_lahir': '',
    'asal_sekolah': '',
  })

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
    onDataChange(localRegistration)
  }, [localRegistration])

  useEffect(() => {
    if (user && registration) {
      setLocalRegistration(registration)
    }
  }, [user, registration])

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
  } 

  return (
    <>
      <DataFormSantri
        registration={localRegistration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
      />
    </> 
  )
}