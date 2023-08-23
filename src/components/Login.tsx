import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Login() {
  const supabaseClient = useSupabaseClient()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()
  
  const handleSignIn = async (event) => {
    event.preventDefault()
    setIsLoggingIn(true)

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: `${phone}@utama.app`,
      password
    })

    if (error) {
      const { error } = await supabaseClient.auth.signUp({
        email: `${phone}@utama.app`,
        password
      })

      setIsLoggingIn(false)

      if (!error) {
        router.push('/daftar')
      }
    }

    if (!error) {
      const {data: profile} = await supabaseClient.from('profiles').select('*').eq('id', data?.user.id).single()
      
      setIsLoggingIn(false)

      if (profile?.is_admin) {
        router.push('/dasbor')
      } else {
        router.push('/daftar')
      }
    }
  }

  return (
    <Form>
      <FormGroup>
        <Label for="phone">Nomor Handphone</Label>
        <Input 
          type="tel" 
          id="phone" 
          placeholder='+628123456789' 
          onChange={event => setPhone(event.target.value)}
          value={phone} 
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder='Password'
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        <Label for="password"><small>Jika sudah punya akun sebelumnya, masukkan password akun tersebut. Jika belum, silakan buat password baru.</small></Label>
      </FormGroup>
      <Button 
        block 
        color={isLoggingIn ? 'secondary' : 'primary'}
        disabled={isLoggingIn}
        className='me-1' 
        onClick={handleSignIn}
      >
        {isLoggingIn ? (
          <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
          ) : 'Masuk'
        }
      </Button>
    </Form>
  )
}