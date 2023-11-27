import { typeActualizarTabla, typeShowLayout, typeShowModal } from "./UseStates"


export type typeGlobalContext = {
    token: string
    showSidebar: boolean
    showModal:typeShowModal
    actualizarTabla: typeActualizarTabla
    showLayout:typeShowLayout

    setToken: (arg: string) => void
    setShowSidebar: (value: boolean) => void
    setShowModal: (value: any) => void
    setActualizarTabla: (arg: typeActualizarTabla) => void
    setShowLayout:(arg:typeShowLayout)=>void
}



export type typeProviderContext = {
    children:React.ReactNode
}
