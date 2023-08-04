import { supabase } from "@/supabase"
import useSWR from "swr"

export function useRegistree() {
  const { data, isLoading, error } = useSWR("registree", async () => {
    const { data } = await supabase.from("registrees").select("*")

    return data
  })

  return {
    registree: data,
    isLoading,
    error
  }
}