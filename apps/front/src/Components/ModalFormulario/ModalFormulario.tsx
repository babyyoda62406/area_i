import { FC, useContext } from 'react'
import { typeModalFormulario } from '../../Types/CMP'
import './ModalFormulario.css'
import { Modal } from 'antd'
import { GlobalContext } from '../../Contexts/GlobalContext'

const ModalFormulario: FC<typeModalFormulario> = () => {
    const { showModal, setShowModal } = useContext(GlobalContext)


    const guardarDatos = () => {

    }

    const cerrarModal = () => {

        return true
    }

    return <div className="ModalFormulario">
        < Modal
            title="Title"
            open={showModal.proyectos}
            onOk={guardarDatos}
            
            onCancel={() => cerrarModal()}
        >
            
        </Modal>


    </div>
}

export default ModalFormulario