import { Card, CardBody, CardTitle, FormGroup, Input, Label } from "reactstrap"
import Select from "react-select"
import { useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"

export default function PasswordEdit() {
  const [phone, setPhone] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className='mb-4'>Akun Pendaftar</CardTitle>
        <FormGroup>
          <Label for='phone'>Phone</Label>
          <Input
            type="text"
            id="phone"
            placeholder="cth: +628123456789"
            required={true}
            value={phone}
            onChange={event => setPhone(event.target.value)}
          /> 
        </FormGroup>  
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type="text"
            id="password"
            placeholder="Password"
            required={true}
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
          />
        </FormGroup>
      </CardBody>
    </Card>
  )
}