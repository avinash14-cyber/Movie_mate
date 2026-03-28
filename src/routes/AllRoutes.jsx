import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movies from '../pages/Movies'
import Series from '../pages/Series'
import Home from '../pages/Home'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies' element={<Movies/>} />
        <Route path='/series' element={<Series/>} />
    </Routes>
    </>
  )
}

export default AllRoutes