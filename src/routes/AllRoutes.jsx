import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movies from '../pages/Movies'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Movies/>} />
    </Routes>
    </>
  )
}

export default AllRoutes