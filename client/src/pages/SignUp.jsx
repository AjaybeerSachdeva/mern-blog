import { Button, Label, TextInput } from 'flowbite-react';
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';


function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex flex-col max-w-lg flex-1'>
          <Link to="/" className='text-4xl font-bold dark:text-white'>
        <span className='px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 text-white'>Playground</span>
        Pixels
        </Link>
        <p className='text-sm mt-5'>
        Join our community today! Sign up to unlock personalized features.
        </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
            <Label htmlFor='username' value='Your username'/>
            <TextInput id='username' type='text' sizing='sm' placeholder='Username' required/>
            </div>
            <div className=''>
            <Label htmlFor='email' value='Your email'/>
            <TextInput id='email' type='email' sizing='sm' placeholder='name@company.com' required/>
            </div>
            <div className=''>
            <Label htmlFor='password' value='Your password'/>
            <TextInput id='password' type='password' sizing='sm' placeholder='Password' required/>
            </div>
            <Button gradientDuoTone='redToYellow'>
              Continue with Google
              <FaGoogle className='ml-3 text-lg'/>
              </Button>
            <Button gradientDuoTone='purpleToBlue'>Sign up!</Button>
          </form>
          <div className='flex items-center gap-2 mt-5 text-sm'>
          <span className=''>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500 underline'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;