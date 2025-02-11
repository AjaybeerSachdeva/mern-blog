import {Button} from 'flowbite-react';
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase";
import { signInStart,signInFailure,signInSuccess } from '../redux/user/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const auth=getAuth(app);
    const handleGoogleClick=async()=>{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt:"select_account"});
      try{
        const resultsFromGoogle=await signInWithPopup(auth, provider);
        const res=await fetch('/api/auth/google',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            name:resultsFromGoogle.user.displayName,
            googlePhotoUrl:resultsFromGoogle.user.photoURL,
            email:resultsFromGoogle.user.email
          })
        });
        const data=await res.json();
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
        <Button type='button' gradientDuoTone='redToYellow' outline onClick={handleGoogleClick}>
        Continue with Google
        <FaGoogle className='ml-3 text-lg'/>
        </Button>
  )
}
