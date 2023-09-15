import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getRandomString } from "@/utils"
import { useMemo } from "react"

export const defaultContents = [
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'beranda',
    title: 'Beranda',
    content: `SMPIT-SMAIT Baitul Qur'an Islamic School (BALQIS) Yogyakarta Tahun Pelajaran 2024/2025.`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'bayar_pembayaran_konfirmasi',
    title: 'Bayar - Pembayaran Konfirmasi',
    content : `<h2 className="display-3">Terima kasih.</h2>
      <p>Kami telah menerima bukti pembayaran yang anda unggah.</p>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'bayar_bukti_diupload',
    title: '',
    content : `<h2 className="display-3">Terima kasih.</h2>
      <p>Kami telah menerima bukti pembayaran dan mencatat pendaftaran anda.</p>
      <p>Selanjutnya, Panitia PSB akan melakukan konfirmasi atas pembayaran yang anda lakukan.</p>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'bayar_upload',
    title: 'Bayar - Upload',
    content : `<p>Selanjutnya, mohon melakukan pembayaran biaya pendaftaran sebesar <strong>Rp. 250.000</strong> ke rekening berikut:</p>
      <ul className="list-unstyled border border-success rounded p-2">
        <li><strong>Bank Syariah Indonesia (BSI)</strong></li>
        <li><strong><em>Nomor 7088404267</em></strong></li>
        <li><em>Yayasan Baitul Qur&apos;an Yogyakarta</em></li>
      </ul>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'status_menunggu_pembayaran',
    title: 'Status - Menunggu Pembayaran',
    content : `<p>Kami belum menerima biaya pendaftaran atau bukti pembayarannya</p>
              <p>Mohon melakukan pembayaran biaya pendaftaran sebesar <strong>Rp. 250.000</strong> ke rekening berikut:</p>
              <ul className="list-unstyled border border-success rounded p-2">
                <li><strong>Bank Syariah Indonesia (BSI)</strong></li>
                <li><strong><em>Nomor 7088404267</em></strong></li>
                <li><em>Yayasan Baitul Qur&apos;an Yogyakarta</em></li>
              </ul>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'status_menunggu_konfirmasi',
    title: 'Status - Menunggu Konfirmasi',
    content : `<p>Kami telah menerima bukti pembayaran dan mencatat pendaftaran anda.</p>
              <p>Selanjutnya, Panitia PSB akan melakukan konfirmasi atas pembayaran yang anda lakukan.</p>
              <p>Silakan kembali lagi ke halaman ini untuk cek status pendaftaran di kemudian hari.</p>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'status_terdaftar',
    title: 'Status - Terdaftar',
    content : `<p>Anda telah terdaftar sebagai calon santri BALQIS Jogja periode 2024/2025.</p>
        <p>Selanjutnya, calon santri wajib mengikuti tes masuk pesantren.</p>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'status_ditolak',
    title: 'Status - Ditolak',
    content : `<p>Setelah memperhatikan dan menimbang syarat pendaftaran dan hasil tes masuk, dengan berat hati kami memutuskan anda <strong>tidak diterima</strong>.</p>
                <p>Terima kasih telah mendaftar dan melalui proses pendaftaran.</p>
                <p>Semoga Allah swt. memberikan kebaikan dan keberkahan kepada anda.</p>`,
    deleted_at: null
  },
  {
    id: getRandomString(),
    type: 'konten',
    slug: 'status_diterima',
    title: 'Status - Diterima',
    content : `<p>Selamat anda diterima sebagai santri.</p>`,
    deleted_at: null
  },
]

export function useContents() {
  const supabase = useSupabaseClient()

  const { data, mutate } = useSWR('/contents', async () => {
    const { data } = await supabase.from('contents').select().order('id')

    return data
  })

  const contents = useMemo(() => {
    if (!data) {
      return defaultContents
    }

    return defaultContents.map(content => {
      const remoteContent = data?.find(datum => datum.slug === content.slug)
      if (remoteContent) {
        return {
          ...content,
          content: remoteContent.content
        }
      }

      return content
    })
  }, [data])

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
    const content = contents?.find(datum => {
      return datum.type === 'konten' && datum.slug === slug
    })

    if (!content) { 
      return ''
    }

    return content?.content
  }

  return {
    contents,
    artikels: data?.filter(datum => datum?.type === 'artikel' && datum?.deleted_at === null),
    kontens: contents?.filter(datum => datum?.type !== 'artikel' && datum?.deleted_at === null),
    createArtikel,
    updateArtikel,
    deleteArtikel,
    getKonten
  }
}
