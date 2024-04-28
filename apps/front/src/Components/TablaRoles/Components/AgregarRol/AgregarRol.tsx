import { GridToolbarContainer } from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
// import ModalFormulario from "../../../ModalFormulario/ModalFormulario";
// import FormularioAddProyect from "../../../Sidebar/Components/FormularioAddProyect/FormularioAddProyect";
import { useState } from "react";

import ModalFormulario from "../../../ModalFormulario/ModalFormulario";

const BtnAddRol = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const mostrarAlgo = () => {
        setShowModal(true)
    }


    return <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={mostrarAlgo}>
            Agregar Rol
        </Button>
        <ModalFormulario showModal={showModal } setShowModal={()=>setShowModal(false)} Formulario = {<></>} />
    </GridToolbarContainer>
}

export default BtnAddRol
