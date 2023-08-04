import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { Lato, Heebo } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })
const heebo = Heebo({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'PSB Balqis',
  description: 'Penerimaan Siswa Baru Balqis',
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}