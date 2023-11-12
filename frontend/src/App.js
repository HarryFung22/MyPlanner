import * as React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/notes' element={<Home/>} exact/>
        <Route path='/notes/create' element={<CreateNote/>}/>
        <Route path='/notes/update/:id' element={<UpdateNote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
