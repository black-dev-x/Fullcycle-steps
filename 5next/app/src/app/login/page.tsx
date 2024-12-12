import { saveSession } from '@/utils/session'
import { redirect } from 'next/navigation'

const LoginAction = async (form: FormData) => {
  'use server';
  const username = form.get('username') as string;
  const password = form.get('password') as string;
  
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }), 
  })
  if(response.ok) {
    const { token } = await response.json();
    await saveSession(token);
    redirect('/dashboard')
  }
}

const LoginPage = () => {
  return (
    <form className='m-4' action={LoginAction}>
      <h1 className='text-2xl font-bold'>Login</h1>
      <br></br>
      <div>
        <label className='block' htmlFor="username">Username</label>
        <input name="username" className='border p-2 w-full' id="username" type="text" />
      </div>
      <div>
        <label className='block' htmlFor="password">Password</label>
        <input name="password" className='border p-2 w-full' id="password" type="password" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-4 mt-1">Login</button>
    </form>
  )
}

export default LoginPage
