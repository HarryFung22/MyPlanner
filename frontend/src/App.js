import * as React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home'
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  const user = useSelector(state => state.user)
  const isUser = user.username === null || user.authToken === null || user.refreshToken === null
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={isUser ? <Navigate to="/login"/> : <Navigate to="/notes" />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/notes' element={<Home/>}/>
          <Route path='/notes/create' element={<CreateNote/>}/>
          <Route path='/notes/update/:id' element={<UpdateNote/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
