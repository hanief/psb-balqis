import useSWR from "swr"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

export function useRegistrations() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, ...rest} = useSWR(user && `/registrations`, async () => {
    const {data} = await supabase.from("registrations").select().eq("user_id", user?.id)

    return data
  })

  return {
    registrations: data,
    ...rest
  }
}

export function useRegistration() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, mutate, ...rest} = useSWR(user && `/registrations/${user?.id}`, async () => {
    const {data, error} = await supabase
      .from("registrations")
      .select()
      .eq("user_id", user?.id)
      .single()

    if (error) {
      await createRegistrationData({'user_id': user?.id})
    }

    return data
  })

  async function createRegistrationData(newData) {
    const updatedData = {...data, ...newData}

    mutate(async () => {
      await supabase
        .from("registrations")
        .insert(newData)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  async function updateRegistrationData(newData) {
    const updatedData = {...data, ...newData}

    mutate(async () => {
      await supabase
        .from("registrations")
        .update(newData)
        .eq("user_id", user?.id)

      return updatedData
    }, {
      optimisticData: updatedData
    })
  }

  return {
    registration: data,
    createRegistrationData,
    updateRegistrationData,
    ...rest
  }
}

export function useProof() {
  const user = useUser()
  const supabase = useSupabaseClient()

  const {data, mutate, ...rest} = useSWR(user && `/proofs/${user?.id}`, async () => {
  const {data} = await supabase
      .from("proofs")
      .select()
      .eq("user_id", user?.id)

    return data
  })

  return {
    proofs: data
  }
}

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