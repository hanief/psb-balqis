import Login from "@/components/Login"

export default function LoginPage() {
  return (
    <div className='container'>
      <h1>Login</h1>
      <Login onSuccess={() => console.log('success')}/>
    </div>
  )
}