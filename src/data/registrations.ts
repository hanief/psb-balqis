import { useSupabaseClient } from "@supabase/auth-helpers-react"
import toast from 'react-hot-toast'
import useSWR from "swr"
import { columns } from "@/data/columns"
import { convertToTitleCase, formatDataWithWilayahNames } from "@/utils"
import XLSX from 'xlsx'

export function useRegistrations() {
  const supabase = useSupabaseClient()

  const {data, mutate, ...rest} = useSWR('/registrations', async () => {
    const { data } = await supabase
      .from("registrations")
      .select()
      .order('created_at', {ascending: false})

    return data
  })

  async function downloadBukti(registration) {
    const { id, nama_lengkap, bukti_pembayaran } = registration
    const { data } = await supabase
      .storage
      .from('proofs')
      .download(bukti_pembayaran)

      var blob=new Blob([data]);
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=`${nama_lengkap || id }_${bukti_pembayaran}`;
      link.click()
  }

  async function downloadAsXLSX(columnForFilter, filterKeyword, showDeleted) {
    let selectOp = supabase
      .from("registrations")
      .select(columns.join(','))

    if (!showDeleted) {
      selectOp = selectOp.is('deleted_at', null)
    }

    if (columnForFilter && filterKeyword)  {
      selectOp = selectOp.ilike(columnForFilter, `%${filterKeyword}%`)
    } 
    
    const {data} = await selectOp.order('created_at', {ascending: false})
    const formattedData = formatData(data)
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar')
    XLSX.writeFile(workbook, `pendaftar${(columnForFilter && filterKeyword) && ('_' + columnForFilter + '_' + filterKeyword)}.xlsx`)

    return data
  }

  function formatData(data) {
    let formattedData = data
    formattedData = formatDataWithWilayahNames(data)
    formattedData = capitalizeData(formattedData)
    return formattedData
  }

  function capitalizeData(data) {
    return data?.map(datum => {
      return {
        ...datum,
        jalur_pendaftaran: convertToTitleCase(datum.jalur_pendaftaran),
        jenjang: datum.jenjang?.toUpperCase(),
        jenis_kelamin: convertToTitleCase(datum.jenis_kelamin),
        jalur_beasiswa_prestasi: convertToTitleCase(datum.jalur_beasiswa_prestasi),
        jalur_beasiswa_khusus: convertToTitleCase(datum.jalur_beasiswa_khusus),
      }
    })
  }

  async function update(id, newDatum) {
    const oldDatum = data?.find(datum => datum.id === id)
    const updatedData = data?.map(datum => {
      if (datum.id === id) {
        return {...oldDatum, ...newDatum}
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

    toast.promise(promise, {
      loading: 'Menyimpan...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  async function remove(id) {
    const updatedData = data?.filter(datum => datum.id !== id)

    return mutate(async () => {
      await supabase.from('registrations')
        .update({deleted_at: new Date().toISOString()})
        .eq('id', id)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  function refreshData(updatedDatum) {
    const updatedData = data?.map(datum => {
      if (datum.id === updatedDatum.id) {
        return updatedDatum
      }

      return datum
    })

    mutate(updatedData, false)
  }

  return {
    registrations: data,
    update,
    downloadBukti,
    downloadAsXLSX,
    remove,
    columns,
    refreshData,
    ...rest
  }
}
