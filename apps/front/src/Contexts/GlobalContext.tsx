import  { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";
import { typeActualizarTabla, typeShowLayout, typeShowModal } from "../Types/UseStates";


/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    showSidebar: false,
    showModal: {
        proyectos:false
    },
    actualizarTabla: { tablaProyectos: 0 },
    
    showLayout: {
        gestionGeneral: false,
        gestionUsuarios:false
    },
    

    setToken: () => { },
    setShowSidebar: () => { },
    setShowModal: () => { },
    setActualizarTabla: () => { },
    setShowLayout:()=>{}

})

/**
 * 
 * @param param0 
 * variables globales de la APP
 * @returns 
 */
export const GlobalContextProvider: FC<typeProviderContext> = ({children}) => {
    
    const [token, setToken] = useState<string>('')
    const [showSidebar,setShowSidebar] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<typeShowModal>({
        proyectos:false,
    })
    const [actualizarTabla, setActualizarTabla] = useState<typeActualizarTabla>({
        tablaProyectos: 0
    })

    const [showLayout, setShowLayout] = useState<typeShowLayout>({
        gestionGeneral: false,
        gestionUsuarios:false,
    })

    return <GlobalContext.Provider value={{token, setToken,showSidebar,setShowSidebar,showModal,setShowModal,actualizarTabla,setActualizarTabla,showLayout, setShowLayout}}>
        {children}
    </GlobalContext.Provider>
}