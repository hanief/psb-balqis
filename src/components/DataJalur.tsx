import { useEffect, useMemo, useState } from 'react'
import DataFormJalur from './DataFormJalur'

export default function DataJalur({registration, onChange, onUploadBukti, onDeleteBukti, onDownloadBukti, onValidityChange}) {
  const [showValiditiesWarning, setShowValiditiesWarning] = useState(false)

  const [localRegistration, setLocalRegistration] = useState(registration)

  const requiredRules = useMemo(() => {
    return {
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

  return (
    <>
      <DataFormJalur
        registration={registration}
        rules={requiredRules}
        validities={validities}
        onChange={handleChange}
        downloadBukti={onDownloadBukti}
        deleteBukti={onDeleteBukti}
        uploadBukti={onUploadBukti}
      />
    </> 
  )
}