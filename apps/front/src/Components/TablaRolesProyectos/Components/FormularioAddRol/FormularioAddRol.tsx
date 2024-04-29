import { FC, useContext, useState } from "react"
import InputForm from "../../../InputForm/InputForm"
import { ItfDataAddRolProy, ItfFormAddRolProy } from "../../interfaces/ElementsRolesProyectos"
import { FetchService } from "../../../../Services/FetchService"
import { RutaServer } from "../../../../Helpers/RutaServer"
import { GlobalContext } from "../../../../Contexts/GlobalContext"
import './FormularioAddRol.css'
import { ALerta } from "../../../../Services/Alerta"

const FormularioAddRol: FC<ItfFormAddRolProy> = ({ setShowModal}) => {

    const {token} = useContext(GlobalContext)
    const [data, setData] = useState<ItfDataAddRolProy>({
        nombre: ''
    })

    const handlerEvent = (type: keyof ItfDataAddRolProy, arg: string) => {

        switch (type) {
            case 'nombre':
                setData({ ...data, [type]: arg })
                break

        }
    }

    const handleSubmit = () => {

        if (data.nombre?.trim() !== '') {
            
        

        FetchService(RutaServer.getRolsProyecto, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token:token
            },
            body: JSON.stringify(data)
        })
            .then(async (res) => {
                switch (res.status) {
                    case 201:
                        const { message: messOk } = await res.json()
                        ALerta({ text: messOk, icon: 'success' })
                        setShowModal(false)
                        
                        break;
                    case 400:
                        const { message: messBad } = await res.json()
                        ALerta({title:messBad,icon:'error'})

                        break;

                    case 401:
                        const { message: mess1 } = await res.json()
                        ALerta({title:mess1,icon:'error'})

                        break

                    case 409:
                        const { message: messConflict} = await res.json()
                        ALerta({title:messConflict,icon:'error'})
                        break;


                    default:
                        break;
                }
            })
        } else {
            ALerta({title:"Por Favor Rellene todos los Campos",icon:'warning',})
        }

    }

    return <form className="FormAddRol" onSubmit={handleSubmit}>
        <InputForm
            label="Nombre de su rol"
            tipo="text"
            evento={(arg) => { handlerEvent('nombre', arg) }} />
        <InputForm
            tipo="submit"
            evento={() => { }}
            value={'Agregar' } />
    </form>
}

export default FormularioAddRol