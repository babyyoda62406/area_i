import { tpActualizarTabla } from "../Types/UseStates";

export interface Item {
    numElement?:string
    key: string;
    id: string;
    // name: string;
    nombre:string
    organizacion: string;
    estado: string;
  }



export   interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'select';
    record: Item;
    index: number;
    children: React.ReactNode;
  }

export interface ItfUpdateTablesInline{
  url: string,
  tableType:keyof tpActualizarTabla
  token: string,
  // columnModified: tpColumnModified,
  actualizarTabla: tpActualizarTabla,
  setActualizarTabla: (arg: tpActualizarTabla) => void,
  paramsUpdate: {[key:string]:string},
  paramsOld: {[key:string]:string}
} 
