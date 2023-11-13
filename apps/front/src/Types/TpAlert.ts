

export type TPAlert = Partial<
{
    title: string
    text: string
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
   
    showConfirmButton:boolean
    timer: number
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
}>