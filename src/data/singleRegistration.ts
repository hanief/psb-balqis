import useSWR from "swr"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import toast from 'react-hot-toast'
import { useCallback, useEffect, useMemo, useState } from "react"
import { debounce } from "lodash"
import { ulid } from "ulid"

export function useSingleRegistration(id = null, initialRegistration = null, onUpdate = null) {
  const supabase = useSupabaseClient()
  const [registration, setRegistration] = useState(initialRegistration)

  const {data, mutate} = useSWR(id && `/registrations/${id}`, async () => {
    const { data } = await supabase
      .from("registrations")
      .select()
      .eq("id", id)
      .limit(1)

    return data
  })

  useEffect(() => {
    if (data) {
      setRegistration(data[0])
    }
  }, [data])

  // useEffect(() => {
  //   if (initialRegistration) {
  //     setRegistration(initialRegistration)
  //   }
  // }, [initialRegistration])

  const uploadFn = useCallback(update, [id])

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
    if (!id) throw new Error('id is required')

    const oldDatum = data?.find(datum => datum.id === id)
    const updatedDatum = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.id === id) {
        return updatedDatum
      }

      return datum
    })

    const promise = mutate(async () => {
      await supabase
        .from("registrations")
        .update(newDatum)
        .eq("id", id)

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
    if (!id) throw new Error('id is required')

    const oldDatum = data?.find(datum => datum.id === id)

    const fileNameSplit = file?.name?.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length-1]
    const path = `${type}/${oldDatum?.id}.${fileExtension}`

    const newDatum = {
      [`bukti_${type}`]: path
    }

    const updatedDatum = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.id === id) {
        return updatedDatum
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
        .update(newDatum)
        .eq('id', id)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedDatum)

    toast.promise(promise, {
      loading: 'Mengunggah file...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return newDatum
  }

  async function downloadBukti(fileName) {
    const { data } = await supabase.storage
      .from('proofs')
      .download(fileName)

    const datum = data[0] || initialRegistration
    const blob = new Blob([data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${datum?.nama_lengkap}-${fileName}`;
    link.click()
  }

  async function deleteBukti(type) {
    const newDatum = {[`bukti_${type}`]: ''}
    const oldDatum = data?.find(datum => datum.id === id)
    const updatedDatum = {...oldDatum, ...newDatum}
    const updatedData = data?.map(datum => {
      if (datum.id === id) {
        return updatedDatum
      } else {
        return datum
      }
    })

    const promise = mutate(async () => {
      await supabase
        .from('registrations')
        .update(newDatum)
        .eq('id', id)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedDatum)

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
    uploadBukti,
    downloadBukti,
    deleteBukti,
  }
}

export function useRegistration(initialRegistration = null, onUpdate = null) {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [registration, setRegistration] = useState(initialRegistration)
  
  const {data, mutate} = useSWR(registration?.id && `/registrations/${registration?.id}`, async () => {
    const { data } = await supabase
      .from("registrations")
      .select()
      .eq("id", registration?.id)
      .single()

    return data
  })

  useEffect(() => {
    if (data) {
      setRegistration(data)
    }
  }, [data])

  const uploadFn = useCallback(update, [registration?.id])

  const handleUpdate = useMemo(() => debounce(uploadFn, 900), [uploadFn])

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

  async function getRegistrationsByNameAndBirthdate(name, birthdate) {
    if (!user) {
      const creds = {
        email: 'pendaftar@utama.app',
        password: 'p3nd4ft4R!'
      }

      const { error } = await supabase
        .auth
        .signInWithPassword(creds)

      if (error) {
        await supabase
          .auth
          .signUp(creds)
      }
    }

    const { data } = await supabase
      .from('registrations')
      .select()
      .ilike('nama_lengkap', `%${name}%`)
      .eq('tanggal_lahir', birthdate)
      .is('deleted_at', null)
      .order('created_at', {ascending: false})

    return data
  }

  async function create(registrationData) {
    if (!user) {
      const creds = {
        email: 'pendaftar@utama.app',
        password: 'p3nd4ft4R!'
      }

      const { error } = await supabase
        .auth
        .signInWithPassword(creds)

      if (error) {
        await supabase
          .auth
          .signUp(creds)
      }
    }

    const {id, created_at, ...regData} = registrationData

    const { data } = await supabase
      .from("registrations")
      .insert(regData)
      .select()
      .single()

    setRegistration(data)

    return data
  }

  async function update(newData) {
    if (!registration?.id) return

    const {id, created_at, deleted_at, updated_at, user_id, ...strippedNewData} = newData
    const updatedData = {...data, ...strippedNewData}

    const promise = mutate(async () => {
      await supabase
        .from("registrations")
        .update(strippedNewData)
        .eq("id", registration?.id)

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedData)

    toast.promise(promise, {
      loading: 'Menyimpan...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    }, {
      id: 'update'
    })

    return promise
  }

  async function uploadBukti(file, type) {
    const fileNameSplit = file?.name?.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length-1]
    const path = `${type}/${ulid()}.${fileExtension}`

    const newData = {
      [`bukti_${type}`]: path
    }

    const updatedData = {...data, ...newData}

    const promise = mutate(async () => {
      const resp = await supabase
        .storage
        .from('proofs')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedData)

    toast.promise(promise, {
      loading: 'Mengunggah file...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    }, {
      id: 'update'
    })

    return newData
  }

  async function downloadBukti(fileName) {
    const { data } = await supabase.storage
      .from('proofs')
      .download(fileName)

    const datum = data || initialRegistration
    const blob = new Blob([data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${datum?.nama_lengkap}-${fileName}`;
    link.click()
  }

  async function deleteBukti(type) {
    const newDatum = {[`bukti_${type}`]: ''}
    const updatedData = {...data, ...newDatum}

    const promise = mutate(async () => {
      if (registration?.id) {
        await supabase
          .from('registrations')
          .update(newDatum)
          .eq('id', registration?.id)
      }

      return updatedData
    }, {
      optimisticData: updatedData
    })

    if (onUpdate) onUpdate(updatedData)

    toast.promise(promise, {
      loading: 'Menghapus...',
      success: 'Terhapus',
      error: 'Gagal menghapus'
    }, {
      id: 'delete'
    })

    return newDatum
  }

  return {
    registration,
    setRegistration,
    change,
    changeMultiple,
    create,
    update,
    uploadBukti,
    downloadBukti,
    deleteBukti,
    getRegistrationsByNameAndBirthdate
  }
}