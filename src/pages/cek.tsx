import { isAdmin } from "@/utils"
import { useEffect } from "react"

export default function CekStatus() {
  useEffect(() => {
    if (isAdmin()) {
      window.location.href = '/'
    }
  }, [])

  return (
    <div></div>
  )
}