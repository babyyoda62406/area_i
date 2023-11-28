import React, { FC, useContext, useEffect, useState } from 'react'
import './TablaGeneralProyects.css'
import { typeTablaProyectos } from '../../Types/TpHlayout'
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Table, Form, Input, Select, Space, Button } from 'antd';
import { Item, EditableCellProps } from '../../Interfaces/TableInterfaces';
import { reloadTabla } from './services/ReloadTabla';
import { modeloColumnas } from './Model/modeloColumnas';



const TablaGeneralProyects: FC<typeTablaProyectos> = () => {


  const { token, showSidebar, actualizarTabla,showLayout } = useContext(GlobalContext)
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

  

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };



  return (
    < div className={`TablageneralProyects MostrarTabla ${showSidebar ? 'WidthTablaSmall' : 'WidthTablaLarge'}`}>
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


