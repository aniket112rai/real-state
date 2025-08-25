import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Property from './pages/Property'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import CreateProperty from './pages/CreateProperty'
import { AuthProvider } from './useContext/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
const App = () => {
  return (
    <div>
  
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Property/>}/>
              <Route path="/createProperty" element={
                <ProtectedRoute>
                  <CreateProperty/>
                </ProtectedRoute>  
              }/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/signin" element={<Signin/>}/>
            </Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
