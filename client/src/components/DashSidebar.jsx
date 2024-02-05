import React from 'react'
import {Sidebar} from "flowbite-react"
import {HiUser, HiArrowSmRight} from "react-icons/hi"
import { Link } from 'react-router-dom'

export const DashSidebar = () => {

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active icon={HiUser} label={'User'} labelColor='dark'>
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item active icon={HiArrowSmRight} label={'Logout'} labelColor='dark'>
          Sign out
        </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
