// App.js

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='register' element={<Register />} />
          {/* <Route path='login' element={<Login />} />
          <Route path='forgotPassword' element={<ForgotPassword />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
