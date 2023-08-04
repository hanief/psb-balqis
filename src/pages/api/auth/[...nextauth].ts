import NextAuth, { NextAuthOptions, User }  from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/supabase"

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

        console.log('login', email, password)

        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // })

        // if (!error) {
        //   console.log('login', data.user)
        //   return {
        //     id: data?.user?.id,
        //     name: data?.user?.email,
        //     email: data?.user?.email,
        //   }
        // } else {
        //   console.log('login', error)
        // }
        
        return {
          id: '12345',
          name: '12345',
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  theme: {
    colorScheme: 'light'
  },
}

const handler = NextAuth(authOptions)

export default handler