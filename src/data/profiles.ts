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

  async function create(registrationData) {
    if (!user) {
      const { data: { user: newUser } } = await supabase.auth.signUp({
        email: `${Date.now()}@utama.app`,
        password: `${Date.now()}!`
      })

      if (newUser) {
        const { data } = await supabase
          .from("registrations")
          .upsert(registrationData)
          .eq("user_id", newUser?.id)
      }
    } else if (user) {
      const { data } = await supabase
        .from("registrations")
        .update(registrationData)
        .eq("user_id", user?.id)
    }
    
    return data
  }

  return {
    user,
    profile: data,
    create,
    ...rest
  }
}