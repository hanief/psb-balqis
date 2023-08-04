import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  const handleSignIn = async (event) => {
    event.preventDefault()

    onSuccess()

    // const {error} = await signIn('credentials', {
    //   redirect: false,
    //   email: email,
    //   password: password
    // })

    // if (!error) {
    //   router.reload()
    // }
  }

  return (
    <Form>
      <FormGroup>
        <Label for="email">
          Email
        </Label>
        <Input 
          label="Email" 
          type="email" 
          id="email" 
          placeholder='Email' 
          onChange={event => setEmail(event.target.value)}
          value={email} 
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">
          Password
        </Label>
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder='Password'
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </FormGroup>
      <Button color='primary' className='me-1' onClick={handleSignIn}>
        Masuk / Daftar
      </Button>
    </Form>
  )

}