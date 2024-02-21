import React, { useEffect, useState } from 'react'
import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice';
import { useLocation } from "react-router-dom";

export const DashSidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const [tab, setTab] = useState('');
  const handleSignOut = async () => {
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


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [])
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col flex-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} label={'Post'} labelColor='dark'>
                  Post
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab === 'users'} icon={HiDocumentText} label={'User'} labelColor='dark'>
                  User
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item className="cursor-pointer" active icon={HiArrowSmRight} label={'Logout'} labelColor='dark' onClick={handleSignOut}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
