import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function DaftarUlang({onSuccess}) {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <>
      <h1>Daftar Ulang</h1>

      <p>
        Ini adalah halaman pendaftaran ulang.
      </p>

      <Form>
        <FormGroup>
          <Label for="nama">
            Nama
          </Label>
          <Input
            label="Nama"
            type="text"
            id="nama"
            placeholder='Nama'
            onChange={event => setNama(event.target.value)}
            value={nama}
            
          />
        </FormGroup>
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
      </Form>

      <Button color='primary' className='me-1' onClick={onSuccess}>
        Selesai
      </Button>
    </>
  )
}