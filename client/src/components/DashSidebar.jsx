import React from 'react'
import {Sidebar} from "flowbite-react"
import {HiUser, HiArrowSmRight} from "react-icons/hi"
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'

export const DashSidebar = () => {
  const dispatch = useDispatch();
  const handleSignOut = async() => {
    try {
      const res = await fetch(`/api/user/sign-out`, {
        method: 'POST'
      })

      const data = await res.json();
      !res.ok
      ? console.log(data?.message)
      : dispatch(signOutSuccess())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active icon={HiUser} label={'User'} labelColor='dark'>
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item className="cursor-pointer"  active icon={HiArrowSmRight} label={'Logout'} labelColor='dark' onClick={handleSignOut}>
          Sign out
        </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
