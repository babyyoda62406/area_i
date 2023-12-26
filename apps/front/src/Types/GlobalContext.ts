import { tpActualizarTabla } from "./UseStates"



export type typeGlobalContext = {
    token: string
    showSidebar: boolean
    actualizarTabla:tpActualizarTabla
   
    

    setToken: (arg: string) => void
    setShowSidebar: (value: boolean) => void
    setActualizarTabla: (arg:tpActualizarTabla)=>void
    
   
}



export type typeProviderContext = {
    children:React.ReactNode
}
