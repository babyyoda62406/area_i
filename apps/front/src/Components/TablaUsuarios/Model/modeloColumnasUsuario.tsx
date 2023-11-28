import { Item } from "../../../Interfaces/TableInterfaces";
import { Popconfirm, Typography } from 'antd';
import { INTUsuario } from "../interfaces/Usuario";




/**
 * 
 * @param isEditing 
 * @param editingKey 
 * @param token 
 * @param form 
 * @param estadoProyecto 
 * @param data 
 * @param setEditingKey 
 * @returns  [{}]
 */
export const modeloColumnasUsuario = (isEditing: Function, editingKey: string, token: string, form: any, estadoProyecto: string, data: INTUsuario[], setEditingKey: Function, setData: Function) => {


  const columns = [
    {
      title: 'Correo',
      dataIndex: 'correo',
      width: '30%',
      sorter: (a: INTUsuario, b: INTUsuario) => (a.correo > b.correo) ? 1 : -1,
      editable: true,
    },
    {
      title: 'Contraseña',
      dataIndex: 'password',
      sorter: (a: INTUsuario, b: INTUsuario) => (a.password > b.password) ? 1 : -1,
      width: '30%',
      editable: true,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      sorter: (a: INTUsuario, b: INTUsuario) => (a.estado > b.estado) ? 1 : -1,
      width: '15%',
      editable: true,
      filters: [
        {
          text: 'Activo',
          value: 'Activo',
        },
        {
          text: 'Inactivo',
          value: 'Inactivo',
        },
      ],

      onFilter: (value: React.Key | boolean, record: INTUsuario) => record.estado == value,
      filterSearch: true,
    },
    // {
    //   title: 'Operacion',
    //   dataIndex: 'operation',
    //   render: (_: any, record: INTUsuario) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link onClick={() => {
    //           console.log('hey')
    //           save(record.key, token, form, estadoProyecto, data, setData,setEditingKey)
    //         }} style={{ marginRight: 8 }}>
    //           Guardar
    //         </Typography.Link>
    //         <Popconfirm title="Estas seguro de que quieres Cancelar?" onConfirm={() => CancelarEdit(setEditingKey)}>
    //           <a>Cancelar</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link disabled={editingKey !== ''} onClick={() => EditarFIla(setEditingKey, form, record)}>
    //         Editar
    //       </Typography.Link>
    //     );

    //   },
    // },

    // {
    //   title: '',
    //   dataIndex: "eliminar",
    //   render: (_: any, record: Item) =>

    //     <Popconfirm title="Estas seguro que quieres eliminarlo?" okText='Confirmar' cancelText='Cancelar' onConfirm={() => EliminarFila(record, token, setData)}>
    //       <a>Eliminar</a>
    //     </Popconfirm>


    // }
  ];



  return columns

}