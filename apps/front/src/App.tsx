import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import FondoPantalla from './Components/Fondopantalla/Fondopantalla'

import Login from './Pages/Login'
import Home from './Pages/Home'
import GestionGeneral from './Components/Gestiongeneral/Gestiongeneral'
import { useContext, useEffect } from 'react'
import { GlobalContext } from './Contexts/GlobalContext'


const App = () => {
  const navigation = useNavigate()
  const { token } = useContext(GlobalContext)
  
  let rutaNueva 

  useEffect(() => {
  rutaNueva = navigation('/')
  },[])
  

  
  return <>
    <FondoPantalla />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='Home' element={ token !=''? <Home /> : rutaNueva } />
      <Route path='VistaGeneral' element={ <GestionGeneral/> } />
      
    </Routes>
    
    
  </>
}

export default App
