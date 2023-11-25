import React, { FC, useContext, useEffect, useState } from 'react'
import './TablaGeneralProyects.css'
import { typeTablaProyectos } from '../../Types/TpHlayout'
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Table, Form, Input, Select, Space, Button } from 'antd';
import { Item, EditableCellProps } from '../../Interfaces/TableInterfaces';
import { reloadTabla } from './services/ReloadTabla';
import { modeloColumnas } from './Model/modeloColumnas';



const TablaGeneralProyects: FC<typeTablaProyectos> = () => {


  const { token, showSidebar, actualizarTabla } = useContext(GlobalContext)
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [estadoProyecto, setEstadoProyecto] = useState<string>('Activo')
  const [editingKey, setEditingKey] = useState('');

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const tamannoPagina = data.length / 2


  const isEditing = (record: Item) => record.key === editingKey;

  let columnas = modeloColumnas(isEditing, editingKey, token, form, estadoProyecto, data, setEditingKey,setData)


  // get proyectos para msotrar en la tabla
  useEffect(() => {
     reloadTabla(token,setData)
    
    
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
    const inputNode = inputType === 'select' ? <Space wrap>
      <Select
        defaultValue={estadoProyecto}
        style={{ width: 120 }}
        onChange={setEstadoProyecto}
        options={[
          { value: 'Activo', label: 'Activo' },
          { value: 'Inactivo', label: 'Inactivo' },

        ]}
      />
    </Space> : <Input />;

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



  const mergedColumns = columnas.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'estado' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  //editar
  // const edit = (record: Partial<Item> & { key: React.Key }) => {
  //   form.setFieldsValue({ nombre: '', organizacion: '', estado: '', ...record });
  //   setEditingKey(record.key);
  // };

  // // cancelar edicion
  // const cancel = () => {
  //   setEditingKey('');
  // };


  // guardar los datos modificados 




  // const eliminarFila = (arg: any) => {
  //   let elemento = arg

  //   const newData = data.filter((item) => item.id !== arg.id);

  //   FetchService(`${RutaServer.getProyectos}/${elemento.id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "token": token
  //     },
  //     body: JSON.stringify(elemento)

  //   })
  //     .then(async (res: Response) => {
  //       switch (res.status) {
  //         case 200:
  //           const { message: messSucces, idElement } = await res.json()
  //           ALerta({ text: messSucces, icon: 'success' })
  //           setData(data.filter((item) => item.id !== idElement))
  //           reloadTabla()
  //           break
  //       }
  //     })

  // }

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };



  return (
    < div className={`TablageneralProyects ${showSidebar ? 'MovDer' : 'MovIzq'}`}>
      <Form form={form} component={false}>
        <Button onClick={() => alert('usted quiere agregar una fila')} type="primary" style={{ marginBottom: 16 }}>
          Agregar Proyecto
        </Button>

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
            current: currentPage,
            pageSize: tamannoPagina,
            total: data.length,
            onChange: onChangePage,
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