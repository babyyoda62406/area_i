export interface Item {
    key: string;
    id: string;
    name: string;
    organizacion: string;
    estado: string;
  }



export   interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }

