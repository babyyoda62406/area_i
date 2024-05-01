import { FC, useContext, useEffect, useState } from 'react'
import './FormularioUpdateRol.css'
import { ItfDataUpdateRoles } from '../../interfaces/ElementsRolesProyectos'
import { ItfFormUpdateRol } from '../../interfaces/ItfTableRoles'
import InputForm from '../../../InputForm/InputForm'
import InputSelect from '../../../InputSelect/InputSelect'
import { elemensActivity } from '../../../../data/ElementsSelect'
import { FetchService } from '../../../../Services/FetchService'
import { RutaServer } from '../../../../Helpers/RutaServer'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import { ALerta } from '../../../../Services/Alerta'

const FormularioUpdateRol: FC<ItfFormUpdateRol> = ({ data,setShowModal }) => {
    
    const {token,actualizarTabla,setActualizarTabla} = useContext(GlobalContext)

    const [dataNew, setDataNew] = useState<ItfDataUpdateRoles>({
        nombre:data.nombre
    })
    const [datoModificado,setDatoModificado] =useState<ItfDataUpdateRoles>({nombre:''})
    
    useEffect(()=>{
        setDatoModificado({...datoModificado, ...dataNew})
    },[])

    const saveData = (type: keyof ItfDataUpdateRoles, arg: string) => {
        
        setDatoModificado({...datoModificado,[type]:arg})
    }

    const handlerSubmit = () => {
        
        if (dataNew.nombre !== datoModificado.nombre) {
          
            FetchService(`${RutaServer.getRolsProyecto}/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                },
                body:JSON.stringify(datoModificado)
            })
                .then(async (res) => {
                
                    switch (res.status) {
                        case 200:
                            const {message:mesSucces} = await res.json()
                            ALerta({ icon: 'success', title: mesSucces })
                            setShowModal(false)
                            setActualizarTabla({ ...actualizarTabla, ['tablaRolesProyectos']: !actualizarTabla.tablaRolesProyectos })
                            break
                        case 409:
                            const {message:messConflict} = await res.json()

                            ALerta({ icon: 'error', title: messConflict })
                            break

                        default:
                            ALerta({ icon: 'success', title: messConflict })
                            break
                    }
            })
        } else {
            ALerta({icon:'warning', title:"por favor modifique una propiedad",position:'center'})
        }

    }

    return <form className="FormularioUpdateRol" onSubmit={handlerSubmit}>
        <InputForm
            value={datoModificado.nombre}
            tipo='text'
            evento={(arg) => saveData('nombre', arg)} />
        
        <InputSelect
            data={elemensActivity}
            defaultValue='Actividad'
            updateSize={(arg) => { saveData('estado', arg) }}
            />

        <InputForm tipo='submit' evento={()=>{}}/>

    </form>
}

export default FormularioUpdateRol