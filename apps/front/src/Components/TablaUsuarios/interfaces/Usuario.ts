
export interface  INTUsuario{
    key: string
    id: string
    correo: string
    password: string
    estado: string
    
}

export   interface EditableCellPropsUsuario extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'select';
    record: INTUsuario;
    index: number;
    children: React.ReactNode;
  }