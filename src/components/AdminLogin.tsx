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
      email: `admin@utama.app`,
      password
    })

    setIsLoggingIn(false)
  }

  return (
    <Form>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder='Password'
          onChange={event => setPassword(event.target.value)}
          value={password}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              handleSignIn(event)
            }
          }}
        />
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