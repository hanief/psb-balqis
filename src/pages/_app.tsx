import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'src/assets/css/datatables.scss'

import type { AppProps } from 'next/app'
import { Lato, Heebo } from 'next/font/google'
import Layout from '@/components/Layout'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import {Database} from '@/lib/database.types'
import { Analytics } from '@vercel/analytics/react'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })
const heebo = Heebo({ subsets: ['latin'], weight: ['400', '700'] })

export default function MyApp({
  Component,
  pageProps: { initialSession, ...pageProps },
}: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      <style jsx global>{`
        body {
          font-family: ${lato.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SessionContextProvider>
  )
}