import { FC, useContext, useEffect,  useState } from 'react'
import './FormularioUpdateOrganization.css'
import { ItfFormUpdateOrg } from '../../Interfaces/CMPS'
import InputForm from '../../../InputForm/InputForm'
import { UpdateOrganization } from '../../Services/UpdateOrganizations'
import { GlobalContext } from '../../../../Contexts/GlobalContext'

const FormularioUpdateOrganization:FC<ItfFormUpdateOrg> = ({id,data,setShowModal}) => {
    
    const {token,actualizarTabla,setActualizarTabla} = useContext(GlobalContext)
    const [newData,setNewData] = useState<string>('')

    useEffect(()=>{setNewData(data.nombre)},[])

    const handleChange = (arg:string) => {
        setNewData(arg)
    }

    const handleSubmit = () => {
        if (newData.trim() !== data.nombre) {
            UpdateOrganization(token,id,newData,actualizarTabla,setActualizarTabla,setShowModal)
        }
        
    }


    return <form className='FormularioUpdateOrganization' onSubmit={()=>handleSubmit()}>
        <InputForm
            label='Nombre de la Empresa'
            value={newData}
            evento={handleChange}
            tipo='text' />
        
            
        <InputForm
            tipo='submit'
            classElement='InputSM'
            evento={() => { }}
            />

    </form>
}

export default FormularioUpdateOrganization