import useSWR from "swr"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import XLSX from 'xlsx'
import toast from 'react-hot-toast'
import { columns } from '@/data/columns'

export function useRegistrations({selectedColumn = 'nama_lengkap', keyword}) {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, ...rest} = useSWR(user && `/registrations/${selectedColumn}/${keyword}`, async () => {
    const {data} = await supabase.from("registrations").select().ilike(selectedColumn, `%${keyword}%`)

    return data
  })

  async function getAsCSV() {
    const {data} = await supabase.from("registrations").select().csv()

    var blob=new Blob([data]);
    var link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download="registrations.csv";
    link.click()

    return data
  }  
  
  async function getAsXLSX() {
    const {data} = await supabase.from("registrations").select(columns.join(',')).neq('nama_lengkap', null)

    console.log(data)

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')
    XLSX.writeFile(workbook, 'registrations.xlsx')

    return data
  }

  async function downloadFile(nama, fileName) {
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

  return {
    registrations: data,
    getAsCSV,
    getAsXLSX,
    downloadFile,
    ...rest
  }
}

export function useRegistration() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const [isUploading, setIsUploading] = useState(false)

  const {data, mutate, ...rest} = useSWR(user && `/registrations/${user?.id}`, async () => {
    const {data} = await supabase
      .from("registrations")
      .select()
      .eq("user_id", user?.id)
      .limit(1)
    
    return data[0]
  })

  async function createRegistrationData(newData) {
    const updatedData = {...data, ...newData}

    mutate(async () => {
      await supabase
        .from("registrations")
        .insert(newData)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  async function updateRegistrationData(newData) {
    const updatedData = {...data, ...newData}

    const promise = mutate(async () => {
      await supabase
        .from("registrations")
        .update(newData)
        .eq("user_id", user?.id)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    toast.promise(promise, {
      loading: 'Menyimpan...',
      success: 'Berhasil disimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  async function uploadBukti(file, type) {
    setIsUploading(true)

    const fileNameSplit = file?.name?.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length-1]
    const path = `${type}/${data?.id}.${fileExtension}`

    const updatedData = {
      [`bukti_${type}`]: path
    }

    const updatedReg = {
      ...data,
      ...updatedData
    }

    const response = mutate(async () => {
      await supabase
        .storage
        .from('proofs')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })
      
      await supabase
        .from('registrations')
        .update(updatedData)
        .eq("user_id", user?.id)

      return updatedReg
    }, {
      optimisticData: updatedReg
    })

    setIsUploading(false)

    return response
  }

  async function deleteBukti(type) {
    const updatedData = {[`bukti_${type}`]: ''}
    const updatedReg = {
      ...data,
      ...updatedData
    }

    const response = mutate(async () => {
      await supabase
        .from('registrations')
        .update(updatedData)
        .eq("user_id", user?.id)

      return updatedReg
    }, {
      optimisticData: updatedReg
    })

    return response
  }

  async function downloadBukti(nama, file) {
    return mutate(async () => {
      const {data} = await supabase
        .storage
        .from('proofs')
        .download(file)

      var blob=new Blob([data]);
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=`${nama}/${file}`;
      link.click()
    })
  }

  return {
    registration: data,
    createRegistrationData,
    updateRegistrationData,
    isUploading,
    uploadBukti,
    deleteBukti,
    downloadBukti,
    ...rest
  }
}

export function useProof(registration_id) {
  const supabase = useSupabaseClient()
  const [isUploading, setIsUploading] = useState(false)
  
  const {data, mutate, ...rest} = useSWR(registration_id && `/proofs/${registration_id}`, async () => {
    const {data} = await supabase
      .storage
      .from("proofs")
      .list('prestasi', {
        limit: 10,
        search: `${registration_id}`
      })

    return data
  })

  return {
    proofs: data,
    isUploading,
    ...rest
  }
}

export function useAccomplishments() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, mutate, ...rest} = useSWR(user && `/accomplishments/${user?.id}`, async () => {
  const {data} = await supabase
      .from("accomplishments")
      .select()
      .eq("user_id", user?.id)

    return data
  })

  async function updateAccomplishments(newAccomplishments, registration) {
    if (!newAccomplishments) throw new Error('newAccomplishments is required')
    if (!registration) throw new Error('registration is required')

    const {...anAccomplishment} = newAccomplishments[0]
    mutate(async () => {
      await supabase
        .from("accomplishments")
        .update(anAccomplishment)
        .eq("user_id", user?.id)
        .eq('registration_id', registration?.id)

      return newAccomplishments
    }, {
      optimisticData: newAccomplishments
    })
  }

  return {
    accomplishments: data,
    updateAccomplishments
  }
}