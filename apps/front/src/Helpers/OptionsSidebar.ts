
import { typeOptionAside } from "../Types/OptionsAside";





export const itemsASide: typeOptionAside[] = [
    {
        name: 'Gestion General',
        children: [
            {
                name: 'Gestionar Proyectos',
                optionFunc: 'gestionProyectos'
            },
            {
                name: 'Agregar Proyecto',
                optionFunc: 'AgregarProyectos'
            },
            {
                name: 'ItemExample2',
                optionFunc: ''
            },
        ]
    },
    {
        name: 'Control Usuarios',
        children: [
            {
                name: 'Control Usuarios',
                optionFunc: 'gestionUsuarios'
            },
            {
                name: 'Agregar persona',
                optionFunc: 'mostrar modal de agregar persona'
            },
            {
                name: 'item3',
                optionFunc: ''
            },
        ]
    },
    {
        name: 'Example3',
        children: [
            {
                name: 'item1',
                optionFunc: ''
            },
            {
                name: 'item2',
                optionFunc: ''
            },
            {
                name: 'item3',
                optionFunc: ''
            },
        ]
    },
    {
        name: 'Example 4',
        children: [
            {
                name: 'item1',
                optionFunc: ''
            },
            {
                name: 'item2',
                optionFunc: ''
            },
            {
                name: 'item3',
                optionFunc: ''
            },
        ]
    },
]

