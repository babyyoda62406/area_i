import { typeShowModal } from "./UseStates"

export type typeGlobalContext = {
    token: string
    showSidebar: boolean
    showModal:typeShowModal
    

    setToken: (arg: string) => void
    setShowSidebar: (value: boolean) => void
    setShowModal:( value:any)=>void
}

export type typeProviderContext = {
    children:React.ReactNode
}
