import { tpActulizarTabla } from "./UseStates"



export type typeGlobalContext = {
    token: string
    showSidebar: boolean
    actualizarTabla:tpActulizarTabla
   
    

    setToken: (arg: string) => void
    setShowSidebar: (value: boolean) => void
    setActualizarTabla: (arg:tpActulizarTabla)=>void
    
   
}



export type typeProviderContext = {
    children:React.ReactNode
}
