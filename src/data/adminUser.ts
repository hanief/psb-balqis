import useSWR from "swr"
import toast from 'react-hot-toast'

export function useAdminUser(userId) {
  const { data, mutate, ...rest } = useSWR(userId && `/admin/user/${userId}`, async () => {
    const { user } = await fetch(`/api/user?userId=${userId}`, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      }
    }).then(res => res.json())

    return user
  })

  async function updatePassword(userId, newPassword) {
    if (!userId) throw new Error('userId is required')
    
    const promise = mutate(async () => {
      await fetch(`/api/user?userId=${userId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password: newPassword})
      })

      return data
    }, {
      optimisticData: data
    })

    toast.promise(promise, {
      loading: 'Mengubah password...',
      success: 'Tersimpan',
      error: 'Gagal menyimpan'
    })

    return promise
  }

  return {
    user: data,
    updatePassword,
    ...rest
  }
}