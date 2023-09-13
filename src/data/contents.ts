import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getRandomString } from "@/utils"

export const defaultContents = [
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'beranda',
    title: 'Beranda',
    content : `SMPIT-SMAIT Baitul Qur'an Islamic School (BALQIS) Yogyakarta Tahun Pelajaran 2024/2025.`
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'bayar_pembayaran_konfirmasi',
    title: 'Bayar - Pembayaran Konfirmasi',
    content : `<h2 className="display-3">Terima kasih.</h2>
      <p>Kami telah menerima bukti pembayaran yang anda unggah.</p>`
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'beranda_bukti_diupload',
    title: 'Beranda - Bukti Diupload',
    content : `<h2 className="display-3">Terima kasih.</h2>
      <p>Kami telah menerima bukti pembayaran dan mencatat pendaftaran anda.</p>
      <p>Selanjutnya, Panitia PSB akan melakukan konfirmasi atas pembayaran yang anda lakukan.</p>
      <br />
      <p>Anda dapat melihat status pendaftaran setiap saat dengan mengunjungi halaman:</p>
      <Link className="btn btn-balqis" href={'/status'}>Cek Status Pendaftaran</Link>`
  }
]

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
