import { useState } from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Score_board from './pages/Score-Board';
import About from './pages/about';
import LogIn from './pages/profile';
import './App.css'

import HomePage from './pages/Home';


function App() {
       return (
        <Router>
          
          <Navbar/>
           <main>
                <Routes>
                     <Route path='/' element={<HomePage/>} />
                     <Route path='/Score-Board' element={<Score_board/>}/>
                     <Route path='/about' element={<About/>}/>
                     <Route path='/profile' element={<LogIn/>}/>
                </Routes>
           </main>
     
        </Router>
       )
}

export default App
