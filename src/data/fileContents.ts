import { useSupabaseClient } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"
import useSWR from "swr"

export function useFileContents() {
  const supabase = useSupabaseClient()

  const { data, mutate } = useSWR('/file-contents', async () => {
    const { data } = await supabase
      .storage
      .from('contents')
      .list('slide', {
        limit: 100
      })

      console.log('data', data)

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
    slides: data?.filter(datum => datum.name !== '.emptyFolderPlaceholder').map(datum => {
      return {
        name: datum.name,
        id: datum.id,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/contents/slide/${datum.name}`
      }
    }),
    downloadFile,
    deleteFile,
    uploadFile
  }
}
