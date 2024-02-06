import React from 'react'
import { useSelector } from 'react-redux'
import { Button, TextInput } from 'flowbite-react'
export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' src={currentUser.profilePicture} alt='user' />
        </div>
        <TextInput
          id='username'
          type='text'
          placeholder='username'
          defaultValue={currentUser?.username} />
            <TextInput
          id='email'
          type='email'
          placeholder='email'
          defaultValue={currentUser?.email} />
            <TextInput
          id='password'
          type='password'
          placeholder='password'
           />
           <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
           </Button>
      </form>
      <div className="mt-5 text-red-500 flex justify-between">
      <span className='cursor-pointer'>Delete Account?</span>
      <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
