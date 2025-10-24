import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Pages/Todo'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProtectedRoute from './components/protectedRoute.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
     <Route 
          path='/todos' 
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          } 
        />
    </Routes>
    </>
  )
}

export default App
