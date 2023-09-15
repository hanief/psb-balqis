import dynamic from 'next/dynamic'
import { useState } from 'react'

const DasborKonten = dynamic(() => import('@/components/DasborKonten'), { ssr: false })

export default function ArtikelPage() {
  return (
    <DasborKonten />
  )
}