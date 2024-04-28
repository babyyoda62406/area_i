import { Route, Routes } from 'react-router-dom'
import './App.css'
import FondoPantalla from './Components/Fondopantalla/Fondopantalla'

import Login from './Pages/Login'
import Home from './Pages/Home'
import GestionGeneral from './Components/Gestiongeneral/Gestiongeneral'
import GestionOrganizaciones from './Components/GestionOrganizaciones/GestionOrganizaciones'
import GestionRoles from './Components/GestionRoles/GestionRoles'



const App = () => {



	return <div className='App'>
		<FondoPantalla />
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='Home' element={<Home />} >
				<Route path='gestiongeneral' element={<GestionGeneral />}></Route>
				<Route path='gestion_organizaciones' element={<GestionOrganizaciones />}></Route>
				<Route path='gestion_roles' element={<GestionRoles/>} />
			</Route>
		</Routes>


	</div>
}

export default App
