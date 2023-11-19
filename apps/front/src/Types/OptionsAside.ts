

type typeChildrenAside = {
    name: string
    optionFunc:string | Function
}

type typeOptionAside = {
    name: string
    children:typeChildrenAside[]
}


export type {
    typeOptionAside
}