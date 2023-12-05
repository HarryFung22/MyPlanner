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

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Navigate to="/notes"/> : <Navigate to="/login" />} />
          <Route path='/login' element={user ? <Navigate to="/notes" /> : <Login/>} />
          <Route path='/notes' element={user ? <Home/> : <Navigate to="/login" />}/>
          <Route path='/notes/create' element={user ? <CreateNote/> : <Navigate to="/login" />}/>
          <Route path='/notes/update/:id' element={user ? <UpdateNote/> : <Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
