import React, { FC, useContext, useEffect, useState } from 'react'
import './TablaGeneralProyects.css'
import {  typeTablaProyectos } from '../../Types/TpHlayout'

import { FetchService } from '../../Services/FetchService';
import { RutaServer } from '../../Helpers/RutaServer';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { ALerta } from '../../Services/Alerta';
import { Table, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import { Item, EditableCellProps } from '../../Interfaces/TableInterfaces';
import { typeDatosEnviarTabla } from '../../Types/Tablas';
// import { typeActualizarTabla } from '../../Types/UseStates';


const TablaGeneralProyects: FC<typeTablaProyectos> = () => {

  
  const { token, showSidebar, actualizarTabla,setActualizarTabla } = useContext(GlobalContext)
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;


  // get proyectos para msotrar en la tabla
  useEffect(() => {

    FetchService(RutaServer.getProyectos, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    })
      .then(async (res: Response) => {

        switch (res.status) {
          case 200:
            let datos = await res.json()
            setData(datos)
            datos.map((element: Item) => {
              return element.key = element.id
            })
            
            break

          case 204:
            ALerta({ title: 'por favor agregue algun proyecto', icon: 'warning' })
            break

          case 304:
            let dataNM = await res.json()
            dataNM.map((element: Item) => {
              return element.key = element.id
            })
            setData(datos)
            break

          case 400:
            const { message: errorMess } = await res.json()
            ALerta({ title: errorMess, icon: 'error' })
            break
          
          case 500:
            const { message: messErr } = await res.json()
            ALerta({title:messErr,icon:'error'})
            break
          
          default:
            console.log('error en tabla de gestion general')
            break
        }
      })
  }, [actualizarTabla])


  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Por favor rellene el campo ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

//editar
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', organizacion: '', estado: '', ...record });
    setEditingKey(record.key);
  };

  // cancelar edicion
  const cancel = () => {
    setEditingKey('');
  };


  // guardar los datos modificados 
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(newData)
      console.log(index)

      if (index > -1) {
  
        const item = newData[index];
        
        const datosEnviar: typeDatosEnviarTabla = {}
        // validacion de campos para generar un nuevo objeto con las propiedades modificadas
        row.name !== item.name ? datosEnviar.name = row.name : ''
        row.organizacion !== item.organizacion ? datosEnviar.organizacion = row.organizacion : ''
        row.estado !== item.estado? datosEnviar.estado= row.estado: ''
        
        // url para hacer peticion PATH al server
        let newUrl = ` ${RutaServer.getProyectos}/${item.id}`

        FetchService(newUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
          body: JSON.stringify(datosEnviar),
        })
          .then(async(res: Response) => { 
            switch (res.status) {
              
              case 200:
                const { message:mesSucces, newProyecto } = await res.json()
                ALerta({title:mesSucces,icon:"success",position:'top-right'})
                newData.splice(index, 1, {
                  ...item,
                  ...newProyecto,
                });
                setData(newData)
                setActualizarTabla(2)

            }
           })
        
        
        setEditingKey('');

      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      width: '30%',
      sorter: (a: Item, b: Item) => (a.name > b.name) ? 1 : -1,
      editable: true,
    },
    {
      title: 'Organizacion',
      dataIndex: 'organizacion',
      sorter: (a: Item, b: Item) => (a.name > b.name) ? 1 : -1,
      width: '30%',
      editable: true,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      sorter: (a: Item, b: Item) => (a.name > b.name) ? 1 : -1,
      width: '15%',
      editable: true,
    },
    {
      title: 'Operacion',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => {
              console.log(record.key)
              save(record.key)
            }} style={{ marginRight: 8 }}>
              Guardar
            </Typography.Link>
            <Popconfirm title="Estas seguro de que quieres Cancelar?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Editar
          </Typography.Link>
        );
      },

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

      onFilter: (value: React.Key | boolean, record:Item) => record.estado == value,
      filterSearch: true,
    },
  ];




  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

 
  
  return (
   < div className={`TablageneralProyects ${showSidebar ? 'MovDer' : 'MovIzq'}`}>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
          rowClassName="editable-row"
          size='middle'
        pagination={{
          onChange: cancel,
        }}
      />
      </Form>
      </div>
  );

}

export default TablaGeneralProyects


// div className={`TablageneralProyects ${showSidebar ? 'MovDer' : 'MovIzq'}`}>

//     <Table columns={columnas} size='middle' dataSource={dataP} />

//   // </div>

/*

  const { token, showSidebar, actualizarTabla } = useContext(GlobalContext)
  const [proyectosServer, setProyectosSever] = useState<typeDatosTablaProyectos[]>([])

  const [form] = Form.useForm();
  const [data, setData] = useState(proyectosServer);
  const [editingKey, setEditingKey] = useState('');



  const isEditing = (record: typeDatosTablaProyectos) => record.id === editingKey;

  const edit = (record: Partial<typeDatosTablaProyectos> & { key: React.Key }) => {
    form.setFieldsValue({ nombre: '', organizacion: '', estado: '', ...record });
    setEditingKey(record.key.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  useEffect(() => {

    FetchService(RutaServer.getProyectos, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    })
      .then(async (res: Response) => {

        switch (res.status) {
          case 200:
            let data = await res.json()
            setProyectosSever(data)
            break

          case 204:
            ALerta({ title: 'por favor agregue algun proyecto', icon: 'warning' })
            break

          case 304:
            let dataNM = await res.json()
            setProyectosSever(dataNM)

            break

          case 400:
            const { message: errorMess } = await res.json()
            ALerta({ title: errorMess, icon: 'error' })
            break

          default:
            console.log('error en tabla de gestion general')
            break
        }
      })
  }, [actualizarTabla])


  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: typeDatosTablaProyectos;
    index: number;
    children: React.ReactNode;
  }

  // funcion para modificar los datos
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


// guardar los datos de modificacion
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as typeDatosTablaProyectos;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };



  interface DataType {
    id: React.Key
    nombre: string
    organizacion: string
    estado: string
    
  }

  const columnas = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      sorter: (a: DataType, b: DataType) => (a.nombre > b.nombre) ? 1 : -1,
      width: '30%',
      editable: true
    },
    {
      title: 'Organizacion',
      dataIndex: 'organizacion',

      sorter: (a: DataType, b: DataType) => (a.organizacion > b.organizacion) ? 1 : -1,
      editable:true
    },
    {
      title: 'Estado',
      dataIndex: 'estado',

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

      onFilter: (value: React.Key | boolean, record: DataType) => record.estado == value,
      filterSearch: true,
      width: '40%',
      editable:true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];


  /**
   * data:typeDatosTablaProyectos[] 
   * 
   * modified data & data.key = id 
   */
/*
const dataP: typeDatosTablaProyectos[] = proyectosServer

data.map((element: any,) => element['key'] = element.id)

const mergedColumns = columnas.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record: typeDatosTablaProyectos) => ({
      record,
      inputType: col.dataIndex === 'nombre' ? 'text' : 'number',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  };
}); */