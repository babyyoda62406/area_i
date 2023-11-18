
export type typeGlobalContext = {
    token: string
    showSidebar:boolean
    

    setToken: (arg: string) => void
    setShowSidebar: (value:boolean)=>void
}

export type typeProviderContext = {
    children:React.ReactNode
}
