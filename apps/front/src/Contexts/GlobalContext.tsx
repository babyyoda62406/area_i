import { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";
import { tpActualizarTabla } from "../Types/UseStates";



/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    showSidebar: false,
    actualizarTabla: {
        tablaProyectos: false
    },






    setToken: () => { },
    setShowSidebar: () => { },
    setActualizarTabla: () => { },




})

/**
 * 
 * @param param0 
 * variables globales de la APP
 * @returns 
 */
export const GlobalContextProvider: FC<typeProviderContext> = ({ children }) => {

    const [token, setToken] = useState<string>('')
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const [actualizarTabla, setActualizarTabla] = useState<tpActualizarTabla>({
        tablaProyectos: false
    })





    return <GlobalContext.Provider value={{ token, setToken, showSidebar, setShowSidebar, actualizarTabla, setActualizarTabla }}>
        {children}
    </GlobalContext.Provider>
}