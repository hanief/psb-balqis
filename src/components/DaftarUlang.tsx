import Link from "next/link";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function DaftarUlang({onSuccess}) {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <>
      <h1>Daftar Ulang</h1>

      <p>
        Silakan mendaftarkan ulang dengan mengikuti tautan di bawah ini
      </p>

      <Link href="#" className="btn btn-primary">Daftar Ulang</Link>
    </>
  )
}