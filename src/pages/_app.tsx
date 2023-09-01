import 'src/assets/globals.scss'

import type { AppProps } from 'next/app'
import { Lato, Heebo } from 'next/font/google'
import Layout from '@/components/Layout'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import {Database} from '@/lib/database.types'
import { Analytics } from '@vercel/analytics/react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
  releaseStage: process.env.NEXT_PUBLIC_APP_ENVIRONMENT
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })
const heebo = Heebo({ subsets: ['latin'], weight: ['400', '700'] })

export default function MyApp({
  Component,
  pageProps: { initialSession, ...pageProps },
}: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}