import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movies from '../pages/Movies'
import Series from '../pages/Series'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Movies/>} />
        <Route path='/series' element={<Series/>} />
    </Routes>
    </>
  )
}

export default AllRoutes