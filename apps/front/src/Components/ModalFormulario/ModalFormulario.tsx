import { FC, useContext } from 'react'
import { typeModalFormulario } from '../../Types/CMP'
import './ModalFormulario.css'
import { Modal } from 'antd'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { typeShowModal } from '../../Types/UseStates'


const ModalFormulario: FC<typeModalFormulario> = ({tipoModal}) => {
    const { showModal, setShowModal } = useContext(GlobalContext)
    
    

    const guardarDatos = () => {

    }

    const cerrarModal = () => {

        setShowModal((prevShowModal:typeShowModal) => {
            return {
                ...prevShowModal,
                [tipoModal]:false
            }
        })
        
    }
    console.log(showModal)
    console.log(showModal.proyectos)

    return  < Modal
            title="Title"
            open={showModal.proyectos}
            onOk={guardarDatos}
            
            
            className='ModalGen'
            onCancel={() => cerrarModal()}
            
        >

            <p className='titleModal'>caballero estan de pingota ustdes</p>
            
        </Modal>


    
}

export default ModalFormulario