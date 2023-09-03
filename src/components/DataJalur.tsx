import { useEffect, useMemo, useState } from 'react'
import DataFormJalur from './DataFormJalur'

export default function DataJalur({registration, onChange, onChangeMultiple, onUploadBukti, onDeleteBukti, onDownloadBukti, onValidityChange}) {
  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  useEffect(() => {
    setLocalRegistration(registration)
  }, [registration])
  
  const requiredRules = useMemo(() => {
    return {
      'jalur_pendaftaran': true,
      'jalur_beasiswa_khusus': localRegistration?.jalur_pendaftaran === 'afirmasi',
      'jalur_beasiswa_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      'nama_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      'tingkat_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      'tahun_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      'bukti_prestasi': localRegistration?.jalur_pendaftaran === 'prestasi',
      'bukti_dhuafa': localRegistration?.jalur_pendaftaran === 'afirmasi' && localRegistration?.jalur_beasiswa_khusus === 'dhuafa',
      'bukti_yatim': localRegistration?.jalur_pendaftaran === 'afirmasi' && localRegistration?.jalur_beasiswa_khusus === 'yatim',
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

    console.log('localRegistration', localRegistration)
    console.log('valids', valids)
    return valids
  }, [requiredRules])

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
      <DataFormJalur
        registration={registration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
        onMultipleChanges={handleMultipleChanges}
        downloadBukti={onDownloadBukti}
        deleteBukti={onDeleteBukti}
        uploadBukti={onUploadBukti}
      />
    </> 
  )
}