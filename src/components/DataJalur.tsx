import { useEffect, useMemo, useState } from 'react'
import { useSingleRegistration } from '@/data/singleRegistration'
import { useUser } from '@supabase/auth-helpers-react'
import DataFormJalur from './DataFormJalur'
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
      // 'jenjang': true,
      'jalur_pendaftaran': true,
      // 'jalur_beasiswa': true,
      // 'jalur_beasiswa_khusus': localRegistration?.jalur_pendaftaran === 'afirmasi',
      // 'jalur_beasiswa_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'nama_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'tingkat_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'tahun_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'bukti_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      // 'bukti_dhuafa': localRegistration?.jalur_beasiswa_khusus === 'dhuafa',
      // 'bukti_yatim':  localRegistration?.jalur_beasiswa_khusus === 'yatim',
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
      <DataFormJalur
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