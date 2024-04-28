
import { typeOptionAside } from "../Types/OptionsAside";


export const itemsSidebar: typeOptionAside[] = [
    {
        name: 'Gestion General',
        children: [
            {
                name: 'Gestionar Proyectos',
                optionFunc: 'gestionProyectos'
            },
            // {
            //     name: 'Agregar Proyecto',
            //     optionFunc: 'AgregarProyectos'
            // },
           
        ]
    },
    {
        name: 'Gestionar Empresas',
        children: [
            {
                name: 'Control Organizaciones',
                optionFunc: 'GestionOrganizaciones'
            },
            // {
            //     name: 'Agregar Organizacion',
            //     optionFunc: 'candela'
            // },
            
        ]
    },
    {
        name: 'Gestionar Roles',
        children: [
            {
                name:'Administrar Roles',
                optionFunc: 'gestionRoles'
            },
            // {
            //     name: 'item2',
            //     optionFunc: ''
            // },
            // {
            //     name: 'item3',
            //     optionFunc: ''
            // },
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

