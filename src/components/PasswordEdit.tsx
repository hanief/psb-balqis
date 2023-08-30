import { Button, Card, CardBody, CardTitle, FormGroup, Input, Label } from "reactstrap"
import { useState } from "react"
import { useAdminUser } from "@/data/adminUser"

export default function PasswordEdit({ initialRegistration }) {
  const { user, updatePassword } = useAdminUser(initialRegistration?.user_id)
  const [phone, setPhone] = useState(getPhoneFromEmail(user?.email))
  const [newPassword, setNewPassword] = useState('')

  function getPhoneFromEmail(email) {
    return email?.split('@')[0]
  }

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
            disabled={true}
            required={true}
            value={getPhoneFromEmail(user?.email)}
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
        <Button color="outline-success" onClick={() => updatePassword(initialRegistration?.user_id, newPassword)}>Update Password</Button>
      </CardBody>
    </Card>
  )
}