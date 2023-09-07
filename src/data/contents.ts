import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getRandomString } from "@/utils"
import toast from "react-hot-toast"

export const defaultContents = [{
  id: getRandomString(),
  slug: 'home_callout',
  type: 'konten',
  title: 'home callout',
  content : 'SMPIT-SMAIT Baitul Qur&apos;an Islamic School (BALQIS) Yogyakarta Tahun Pelajaran 2024/2025.'
}]

export function useContents() {
  const supabase = useSupabaseClient()

  const { data, mutate } = useSWR('/contents', async () => {
    const { data } = await supabase.from('contents').select().order('id')

    return data
  })

  async function createArtikel(artikel) {
    const promise = mutate(async () => {
      const {id, ...newArtikel} = artikel

      const { data: newData } = await supabase
        .from('contents')
        .insert(newArtikel)

      return [...data, newData]
    }, {
      optimisticData: [...data, artikel]
    })

    return promise
  }  
  
  async function updateArtikel(artikel) {
    const newContents = data.map(datum => {
      if (datum.id === artikel.id) {
        return artikel
      }

      return datum
    })

    const {id, created_at, updated_at, ...updatedArtikel} = artikel
    const promise = mutate(async () => {
      await supabase
        .from('contents')
        .update(updatedArtikel)
        .eq('id', artikel.id)

      return newContents
    }, {
      optimisticData: newContents
    })

    return promise
  }

  async function deleteArtikel(artikel) {
    const newContents = data.filter(datum => datum.id !== artikel.id)

    const promise = mutate(async () => {
      const { data: newData } = await supabase
        .from('contents')
        .update({deleted_at: new Date().toISOString()})
        .eq('id', artikel.id)

      return newContents
    }, {
      optimisticData: newContents
    })

    return promise
  }

  function getKonten(slug) {
    const contents = data || defaultContents

    return contents?.find(datum => {
      return datum.type === 'konten' && datum.slug === slug
    })
  }

  return {
    contents: data || defaultContents,
    artikels: data?.filter(datum => datum?.type === 'artikel' && datum?.deleted_at === null),
    kontens: data?.filter(datum => datum?.type !== 'artikel' && datum?.deleted_at === null) || defaultContents,
    createArtikel,
    updateArtikel,
    deleteArtikel,
    getKonten
  }
}

export function useFileContents() {
  const supabase = useSupabaseClient()

  const { data, mutate } = useSWR('/file-contents', async () => {
    const { data } = await supabase
      .storage
      .from('contents')
      .list('slide', {
        limit: 100
      })

    return data
  })

  async function deleteFile(file) {
    return mutate(async () => {
      await supabase
        .storage
        .from('contents')
        .remove(['slide/' + file])

      return data
    })
  }

  async function downloadFile(file) {
    const { data } = await supabase
      .storage
      .from('contents')
      .download('slide/' + file)

    let blob = new Blob([data]);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = file;
    link.click()
  }

  async function uploadFile(file) {
    const promise = mutate(async () => {
      await supabase
        .storage
        .from('contents')
        .upload('slide/'+file?.name, file, {
          cacheControl: '3600',
          upsert: true
        })

      return data
    })

    toast.promise(promise, {
      loading: 'Mengunggah file...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  return {
    slides: data?.filter(datum => datum.name !== '.emptyFolderPlaceholder'),
    downloadFile,
    deleteFile,
    uploadFile
  }
}
