import NextAuth, { NextAuthOptions }  from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'supabase',
      type: 'credentials',
      name: 'Supabase',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const {email, password} = credentials


        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // })

        // if (!error) {
        //   const { data, error } = await supabase.auth.signUp({
        //     email,
        //     password,
        //   })


        //   return {
        //     id: data?.user?.id,
        //     name: data?.user?.email,
        //     email: data?.user?.email,
        //   }
        // } else {
        //   console.log('login', error)
        // }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/daftar'
  }
}

const authHandler = NextAuth(authOptions)

export default async function handler(...params: any[]) {
  await authHandler(...params)
}