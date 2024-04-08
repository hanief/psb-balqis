import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"

const defaultSettings = {
  'pendaftaran_buka': 'true',
  'mulai_pendaftaran': '',
  'akhir_pendaftaran': ''
}

export function useSettings() {
  const supabase = useSupabaseClient()

  const { data, mutate } = useSWR('/settings', async () => {
    const { data } = await supabase.from('settings').select()

    return data
  })

  const settings = useMemo(() => {
    return data?.reduce((acc, val) => {
      acc[val.type] = val.value

      return acc
    }, defaultSettings)
  }, [data])

  async function updateSetting(key, value) {
    return mutate(async () => {
      await supabase.from('settings').update({value: value}).eq('type', key)

      return data
    }, {
      optimisticData: data
    })
  }

  return {
    settings,
    updateSetting
  }
}
