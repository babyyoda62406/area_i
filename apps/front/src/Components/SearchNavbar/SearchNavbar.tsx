import { useState } from 'react'
import './SearchNavbar.css'
import {AiOutlineSearch as IconSearch} from 'react-icons/ai'

const SearchNavbar = () => {
    const [activo, setActivo] = useState<boolean>(false)
    
    return <div className="SearchNavbar">
        {activo?<input type="text" className='InputSearch' />:''}
        <span onClick={()=>{setActivo(true)}}><IconSearch/></span>
    </div>
}

export default SearchNavbar