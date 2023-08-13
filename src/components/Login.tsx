import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Login({ onSuccess }) {
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  const handleSignIn = async (event) => {
    event.preventDefault()

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password
      })

      if (!error) {
        router.push('/daftar')
      }
    }

    if (!error) {
      router.push('/daftar')
    }
  }

  return user ? (
    <>
      <p>Selamat datang, {user.email}</p>

      <Button color='primary' className='me-1' onClick={() => supabaseClient.auth.signOut()}>
        Keluar
      </Button>
    </>
  ) : (
    <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input 
          label="Email" 
          type="email" 
          id="email" 
          placeholder='nama@contoh.com' 
          onChange={event => setEmail(event.target.value)}
          value={email} 
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder='Buat password baru'
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </FormGroup>
      <Button block color='primary' className='me-1' onClick={handleSignIn}>
        Masuk / Daftar
      </Button>
    </Form>
  )
}