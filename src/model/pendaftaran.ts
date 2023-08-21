import useSWR from "swr"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import XLSX from 'xlsx'

export function useRegistration({
  specificUserId, 
  selectedColumn, 
  keyword} = {
    specificUserId: null,
    selectedColumn: null,
    keyword: null
  }
) {
  const supabase = useSupabaseClient()
  const [isUploading, setIsUploading] = useState(false)

  const columns = [
    'nama_lengkap',
    'jenjang',
    'jalur_pendaftaran',
    'jalur_beasiswa',
    'jalur_beasiswa_prestasi',
    'nama_prestasi',
    'tingkat_prestasi',
    'tahun_prestasi',
    'jalur_beasiswa_khusus',
    'jenis_kelamin',
    'tempat_lahir',
    'tanggal_lahir',
    'asal_sekolah',
    'nama_ayah',
    'nomor_hp_ayah',
    'nama_ibu',
    'nomor_hp_ibu',
    'alamat',
    'provinsi',
    'kabupaten',
    'kecamatan',
    'desa',
    'kodepos',
    'pembayaran_diterima',
    'created_at',
  ]

  let requestKey = '/registrations'
  if (specificUserId) {
    requestKey += `/${specificUserId}`
  }
  if (selectedColumn) {
    requestKey += `/${selectedColumn}`
  }
  if (keyword) {
    requestKey += `/${keyword}`
  }

  const {data, mutate, ...rest} = useSWR(requestKey, async () => {
    let selectOp = supabase
        .from("registrations")
        .select()
    
    if (specificUserId) {
      selectOp = selectOp
        .eq("user_id", specificUserId)
    }
    
    if (selectedColumn && keyword)  {
        selectOp = selectOp
        .ilike(selectedColumn, `%${keyword}%`)
    } 

    const {data} = await selectOp.is('deleted_at', null).order('created_at', {ascending: false})

    return data
  })

  async function downloadBukti(nama, fileName) {
    const { data, error } = await supabase
      .storage
      .from('proofs')
      .download(fileName)

      var blob=new Blob([data]);
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=`${nama} ${fileName}`;
      link.click()
  }
  
  async function downloadAsXLSX({isFiltered = false}) {
    let response

    if (isFiltered) {
      response = await supabase.from("registrations").select(columns.join(',')).is('deleted_at', null).ilike(selectedColumn, `%${keyword}%`)
    } else {
      response = await supabase.from("registrations").select(columns.join(',')).is('deleted_at', null)
    }
    
    const {data} = response
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar')
    XLSX.writeFile(workbook, `pendaftar${isFiltered ? '_' + selectedColumn + '_' + keyword : '_semua'}.xlsx`)

    return data
  }

  async function updateRegistrationData(newDatum) {
    const oldDatum = data?.find(datum => datum.id === specificUserId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === specificUserId) {
        return newData
      } else {
        return datum
      }
    })

    return mutate(async () => {
      await supabase
        .from("registrations")
        .update(newDatum)
        .eq("user_id", specificUserId)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  async function updateSpecificRegistrationData(userId, newDatum) {
    const oldDatum = data?.find(datum => datum.user_id === userId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === userId) {
        return newData
      } else {
        return datum
      }
    })

    return mutate(async () => {
      await supabase
        .from("registrations")
        .update(newDatum)
        .eq("user_id", userId)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  async function uploadBukti(file, type) {
    setIsUploading(true)

    const fileNameSplit = file?.name?.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length-1]
    const path = `${type}/${data[0]?.id}.${fileExtension}`

    const newDatum = {
      [`bukti_${type}`]: path
    }

    const oldDatum = data?.find(datum => datum.id === specificUserId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === specificUserId) {
        return newData
      } else {
        return datum
      }
    })

    const response = mutate(async () => {
      await supabase
        .storage
        .from('proofs')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })
      
      await supabase.from('registrations')
        .update(updatedData)
        .eq('id', data[0]?.id)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    setIsUploading(false)

    return response
  }

  async function deleteBukti(type) {
    const newDatum = {[`bukti_${type}`]: ''}
    const oldDatum = data?.find(datum => datum.id === specificUserId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === specificUserId) {
        return newData
      } else {
        return datum
      }
    })

    return mutate(async () => {
      await supabase.from('registrations')
        .update(updatedData)
        .eq('id', data[0]?.id)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  async function deleteData(userId) {
    const updatedData = data?.filter(datum => datum.user_id !== userId)

    return mutate(async () => {
      await supabase.from('registrations')
        .update({deleted_at: new Date().toISOString()})
        .eq('user_id', userId)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  return {
    registrations: data,
    singleRegistration: data ? data[0] : null,
    updateRegistrationData,
    updateSpecificRegistrationData,
    isUploading,
    uploadBukti,
    downloadBukti,
    deleteBukti,
    downloadAsXLSX,
    refreshData: mutate,
    columns,
    deleteData,
    ...rest
  }
}
