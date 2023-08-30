import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import toast from 'react-hot-toast'
import { useCallback, useEffect, useMemo, useState } from "react"
import { debounce } from "lodash"

export function useSingleRegistration(userId, onUpdate = null, initialRegistration = null) {
  const supabase = useSupabaseClient()
  const [registration, setRegistration] = useState(initialRegistration)

  const {data, mutate} = useSWR(userId && `/registrations/${userId}`, async () => {
    const { data } = await supabase
      .from("registrations")
      .select()
      .eq("user_id", userId)
      .limit(1)

    return data
  })

  useEffect(() => {
    if (data) {
      setRegistration(data[0])
    }
  }, [data])

  useEffect(() => {
    if (initialRegistration) {
      setRegistration(initialRegistration)
    }
  }, [initialRegistration])

  const uploadFn = useCallback(update, [userId])

  const handleUpdate = useMemo(() => debounce(uploadFn, 750), [uploadFn])

  function change(key, value) {
    const updatedData = {[key]: value}
    setRegistration({ ...registration, ...updatedData})
    handleUpdate(updatedData)
  }

  function changeMultiple(changes) {
    const updatedData = {}
    changes.forEach(({ key, value }) => {
      updatedData[key] = value
    })
    setRegistration({ ...registration, ...updatedData})
    handleUpdate(updatedData)
  }

  async function update(newDatum) {
    if (!userId) throw new Error('userId is required')

    const oldDatum = data?.find(datum => datum.user_id === userId)
    const updatedDatum = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === userId) {
        return updatedDatum
      }

      return datum
    })

    const promise = mutate(async () => {
      await supabase
        .from("registrations")
        .update(newDatum)
        .eq("user_id", userId)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedDatum)

    toast.promise(promise, {
      loading: 'Menyimpan...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  async function uploadBukti(file, type) {
    if (!userId) throw new Error('userId is required')

    const fileNameSplit = file?.name?.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length-1]
    const path = `${type}/${data[0]?.id}.${fileExtension}`

    const newDatum = {
      [`bukti_${type}`]: path
    }

    const oldDatum = data?.find(datum => datum.id === userId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === userId) {
        return newData
      } else {
        return datum
      }
    })

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
        .eq('user_id', userId)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    toast.promise(promise, {
      loading: 'Mengunggah file...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  async function downloadBukti(fileName) {
    const { data } = await supabase.storage
      .from('proofs')
      .download(fileName)

    const blob = new Blob([data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${initialRegistration?.nama_lengkap}-${fileName}`;
    link.click()
  }

  async function deleteBukti(type) {
    const newDatum = {[`bukti_${type}`]: ''}
    const oldDatum = data?.find(datum => datum.id === userId)
    const newData = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.user_id === userId) {
        return newData
      } else {
        return datum
      }
    })

    const promise = mutate(async () => {
      await supabase
        .from('registrations')
        .update(updatedData)
        .eq('user_id', userId)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    toast.promise(promise, {
      loading: 'Menghapus...',
      success: 'Terhapus',
      error: 'Gagal menghapus'
    })

    return promise
  }

  return {
    registration,
    change,
    changeMultiple,
    update,
    uploadBukti,
    downloadBukti,
    deleteBukti,
  }
}