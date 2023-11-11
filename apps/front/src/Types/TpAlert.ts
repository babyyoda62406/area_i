

export type TPAlert = {
    titulo: string
    texto: string
    icono: 'success' | 'error' | 'warning' | 'info' | 'question'
    button: boolean
    showConfirmButton:boolean
    tiempo: number
    position: 'top'
    | 'top-start'
    | 'top-end'
    | 'top-left'
    | 'top-right'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'center-left'
    | 'center-right'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-left'
    | 'bottom-right'
}