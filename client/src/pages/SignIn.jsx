import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector((state)=> state.user)
  const [formData, setFormData] = useState({})
  // const [errorMessage, setErrorMessage] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
     
      const data= await res.json();
      if (data.success === false) {
       dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })

  }
  return (
    <div className='min-h-screen mt-20'>
      {/* left */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link className='font-bold dark:text-white text-4xl' to="/">
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Mern</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value='Your email' />
              <TextInput type='email' placeholder='example@gmail.com' id='email' onChange={handleChange} />
            </div>
            <div className="">
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'> Loading...</span>
                </>
               ) : (
                'Sign In'
               )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Do not have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
