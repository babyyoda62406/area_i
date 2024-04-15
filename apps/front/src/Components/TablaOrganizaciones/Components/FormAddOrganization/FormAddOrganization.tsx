import { FC, useContext, useState } from 'react'
import './FormAddOrganization.css'
import { ItfFormAddOrg } from '../../Interfaces/CMPS'
import InputForm from '../../../InputForm/InputForm'
import { tpDataCreateOrg } from '../../Types/DataOrganizations'
import { FetchService } from '../../../../Services/FetchService'
import { RutaServer } from '../../../../Helpers/RutaServer'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import { ALerta } from '../../../../Services/Alerta'

const FormAddOrganization: FC<ItfFormAddOrg> = ({ setShowModal }) => {

    const { token,actualizarTabla,setActualizarTabla } = useContext(GlobalContext)
    const [data, setData] = useState<tpDataCreateOrg>({ nombre: '' })

    const saveData = (arg: string) => {

        setData({ ...data, ['nombre']: arg })
    }

    const sendData = () => {
        
        if (!data.nombre) return

        FetchService(RutaServer.getOrganizaciones, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)

        })
            .then(async (res) => {

                switch (res.status) {
                    case 201:
                        // const elemento = await res.json()
                        ALerta({ icon: 'success', title: 'Su Organizacion se ha creado con exito' })
                        setActualizarTabla({ ...actualizarTabla, ['tablaOrganizaciones']:!actualizarTabla.tablaOrganizaciones})
                        setShowModal()
                        break
                    case 404:
                        alert('candela')
                        break
                    case 409:
                        ALerta({icon:'error',title:'Nombre de Empresa no Disponible',position:'center'})

                        break
                    case 200:
                        break
                    default:
                        break
                }

            })
            .catch(err => console.log(err))

    }

    return <form className="FormAddOrganization" onSubmit={() => sendData()}>
        <InputForm
            tipo='text'
            label='Introduzca el Nombre de la Empresa'
            evento={(arg) => saveData(arg)} />
        <InputForm tipo='submit' evento={() => { }} />
    </form>
}

export default FormAddOrganization