import { typeActualizarTabla, typeShowModal } from "./UseStates"


export type typeGlobalContext = {
    token: string
    showSidebar: boolean
    showModal:typeShowModal
    actualizarTabla:typeActualizarTabla

    setToken: (arg: string) => void
    setShowSidebar: (value: boolean) => void
    setShowModal: (value: any) => void
    setActualizarTabla: (arg:typeActualizarTabla)=>void
}



export type typeProviderContext = {
    children:React.ReactNode
}
