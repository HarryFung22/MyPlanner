import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home'
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Summarize from './pages/Summarize';

function App() {
  const [user, setUser] = useState((localStorage.getItem('user')));
  const isAuthenticated = user !== null;
  
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route
            path='/login'
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path='/*'
            element={
              isAuthenticated ? (
                <>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path='create' element={<CreateNote />} />
                    <Route path='update/:id' element={<UpdateNote />} />
                    <Route path='summarize' element={<Summarize />} />
                  </Routes>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
