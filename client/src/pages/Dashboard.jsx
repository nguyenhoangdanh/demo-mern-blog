import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../components/DashSidebar";
import { DashProfile } from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
export const Dashboard = () => {
  const location = useLocation();

  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* SideBar */}
        <DashSidebar />
      </div>

      {/* Profile */}
      {tab === 'profile' && <DashProfile />}

      {/* Post */}
      {tab === 'posts' && <DashPost />}

      {/* Users */}
      {tab === 'users' && <DashUsers />}

       {/* comments  */}
       {tab === 'comments' && <DashComments />}

       {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}
