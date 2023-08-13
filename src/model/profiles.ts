import { supabase } from "@/lib/supabase"
import useSWR from "swr"
import { useUser } from "@supabase/auth-helpers-react"

export function useProfile() {
  const user = useUser()

  const { data, ...rest } = useSWR(user && "/profiles", async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single()

    return data
  })

  return {
    user,
    profile: data,
    ...rest
  }
}