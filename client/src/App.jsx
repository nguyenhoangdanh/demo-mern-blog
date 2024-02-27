import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard'
import { Header } from './components/Header'
import './index.css'
import { Projects } from './pages/Projects'
import { FooterCom } from './components/Footer'
import { SignUp } from './pages/SignUp'
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import { CreatePost } from './pages/CreatePost';
import { UpdatePost } from './pages/UpdatePost';
import { PostPage } from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import { Search } from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/search' element={<Search />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />

        </Route>

      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
