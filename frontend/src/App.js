import * as React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
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
