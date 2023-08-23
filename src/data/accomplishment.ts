import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import useSWR from "swr"

export function useAccomplishments() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, mutate, ...rest} = useSWR(user && `/accomplishments/${user?.id}`, async () => {
  const {data} = await supabase
      .from("accomplishments")
      .select()
      .eq("user_id", user?.id)

    return data
  })

  async function updateAccomplishments(newAccomplishments, registration) {
    if (!newAccomplishments) throw new Error('newAccomplishments is required')
    if (!registration) throw new Error('registration is required')

    const {...anAccomplishment} = newAccomplishments[0]
    mutate(async () => {
      await supabase
        .from("accomplishments")
        .update(anAccomplishment)
        .eq("user_id", user?.id)
        .eq('registration_id', registration?.id)

      return newAccomplishments
    }, {
      optimisticData: newAccomplishments
    })
  }

  return {
    accomplishments: data,
    updateAccomplishments
  }
}