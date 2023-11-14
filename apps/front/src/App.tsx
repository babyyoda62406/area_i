import { Route, Routes } from 'react-router-dom'
import './App.css'
import FondoPantalla from './Components/Fondopantalla/Fondopantalla'

import Login from './Pages/Login'
import Home from './Pages/Home'
import GestionGeneral from './Components/Gestiongeneral/Gestiongeneral'



const App = () => {
  
  

  return <div className='App'>
    <FondoPantalla />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='Home' element={ <Home/> } />
      <Route path='VistaGeneral' element={ <GestionGeneral/> } />
      
    </Routes>
    
    
  </div>
}

export default App
