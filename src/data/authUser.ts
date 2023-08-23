import useSWR from "swr"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export function useAuthUser(userId) {
  const supabase = useSupabaseClient()

  const { data } = useSWR(userId && `/auth/user/${userId}`, async () => {
    const {data} = await supabase.auth.admin.getUserById(userId)
    
    return data
  })

  return {
    user: data
  }
}