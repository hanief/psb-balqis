import useSWR from "swr"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import toast from 'react-hot-toast'

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
      success: 'Tersimpan',
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

    const promise = mutate(async () => {
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

      setIsUploading(false)

      return updatedReg
    }, {
      optimisticData: updatedReg
    })

    toast.promise(promise, {
      loading: 'Mengunggah...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
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
