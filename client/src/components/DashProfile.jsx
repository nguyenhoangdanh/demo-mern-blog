import React from 'react'
import {useSelector} from 'react-redux'
export const DashProfile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div>
      <h1>Profile</h1>
      <form>
        <img src={currentUser.profilePicture} alt='user' />
      </form>
    </div>
  )
}
