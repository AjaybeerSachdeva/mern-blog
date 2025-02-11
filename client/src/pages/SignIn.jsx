import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/UserSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,error:errorMessage}=useSelector((state)=>state.user);
  const [formData,setFormData]=useState({});
  const handleChange=(e)=>{
    setFormData(
      {
        ...formData,
    [e.target.id]:e.target.value.trim()
      }
    );
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault(); 
    if(!formData.email || !formData.password)
    {
      return dispatch(signInFailure("Please fill out all the fields."));
    }
    try{
    dispatch(signInStart()); 
    const res=await fetch('/api/auth/signin',{
      method:"POST",
      body:JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
    }
    });
    const data=await res.json();
    if(data.success===false)
    {
      return dispatch(signInFailure(data.message));
    }
    if(res.ok)
    {
      dispatch(signInSuccess(data));
      navigate('/');
    }
  }
  catch(error)
  {
    dispatch(signInFailure(error.message)); 
  }
  }
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
        Welcome back! Please sign in to access your account and continue where you left off.
        </p>
        </div>
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className=''>
            <Label htmlFor='email' value='Your email'/>
            <TextInput id='email' type='email' sizing='sm' placeholder='name@company.com' onChange={handleChange} required/>
            </div>
            <div className=''>
            <Label htmlFor='password' value='Your password'/>
            <TextInput id='password' type='password' sizing='sm' placeholder='Password' onChange={handleChange} required/>
            </div>
            <Button type='submit' gradientDuoTone='purpleToBlue' disabled={loading}>
              {loading? (<>
                <Spinner aria-label="Spinner button example"/>
                <span className="pl-3">Loading...</span>
                </>
              )
              :"Sign In!"}
              </Button>
              <OAuth/>
          </form>
          <div className='flex items-center gap-2 mt-5 text-sm'>
          <span className=''>Don't have an account?</span>
          <Link to='/sign-up' className='text-blue-500 underline'>Sign Up</Link>
          </div>
          {errorMessage &&
          <Alert className='mt-5' color="failure"
            icon={HiInformationCircle}>
              <span className='font-medium'>{errorMessage}</span>
          </Alert>
          }
        </div>
      </div>
    </div>
  )
}
