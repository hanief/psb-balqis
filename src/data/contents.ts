import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getRandomString } from "@/utils"

export const defaultContents = [{
  id: getRandomString(),
  slug: 'home_callout',
  type: 'ui',
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

  return {
    contents: data || defaultContents,
    artikels: data?.filter(datum => datum?.type === 'artikel' && datum?.deleted_at === null),
    createArtikel,
    updateArtikel,
    deleteArtikel
  }
}