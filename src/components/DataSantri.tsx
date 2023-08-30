import { useEffect, useMemo, useState } from 'react'
import { useSingleRegistration } from '@/data/singleRegistration'
import { useUser } from '@supabase/auth-helpers-react'
import DataFormSantri from './DataFormSantri'
import { Alert, Button } from 'reactstrap'
import { convertToTitleCase } from "@/utils"

export default function Data({onValidityChange}) {
  const user = useUser()

  const {
    registration, 
    change,
    changeMultiple,
    uploadBukti, 
    deleteBukti,
    downloadBukti
  } = useSingleRegistration(user?.id)

  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = useMemo(() => {
    return {
      'nama_lengkap': true,
      'jenis_kelamin': true,
      'tempat_lahir': true,
      'tanggal_lahir': true,
      'asal_sekolah': true,
      // 'provinsi': true,
      // 'kabupaten': true,
      // 'kecamatan': true,
      // 'desa': true,
      // 'kodepos': true,
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
    if (requiredRules[name] && value) {
      change(name, value)
    }
  } 
  
  function handleMultipleChanges(changes) {
    const newRegistration = {}
    let isValid = true
    changes.forEach(change => {
      newRegistration[change.key] = change.value
      if (requiredRules[change.key] && !change.value) {
        isValid = false
      }
    })

    setLocalRegistration({
      ...localRegistration,
      ...newRegistration
    })

    if (isValid) {
      changeMultiple(changes)
    }
  }

  return (
    <>
      <DataFormSantri
        registration={registration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
        onMultipleChanges={handleMultipleChanges}
        downloadBukti={downloadBukti}
        deleteBukti={deleteBukti}
        uploadBukti={uploadBukti}
      />
    </> 
  )
}