import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import useSWR from "swr"

export function useProof(registration_id) {
  const supabase = useSupabaseClient()
  const [isUploading, setIsUploading] = useState(false)
  
  const {data, mutate, ...rest} = useSWR(registration_id && `/proofs/${registration_id}`, async () => {
    const {data} = await supabase
      .storage
      .from("proofs")
      .list('prestasi', {
        limit: 10,
        search: `${registration_id}`
      })

    return data
  })

  return {
    proofs: data,
    isUploading,
    ...rest
  }
}
