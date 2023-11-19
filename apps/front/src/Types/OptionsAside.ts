

type typeChildrenAside = {
    name: string
    optionFunc:string 
}

type typeOptionAside = {
    name: string
    children:typeChildrenAside[]
}


export type {
    typeOptionAside
}