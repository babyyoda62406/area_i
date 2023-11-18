import React, { FC, useContext, useEffect, useState } from 'react'
import './TablaGeneralProyects.css'
import { typeDatosTablaProyectos, typeTablaProyectos } from '../../Types/TpHlayout'

import { FetchService } from '../../Services/FetchService';
import { RutaServer } from '../../Helpers/RutaServer';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { ALerta } from '../../Services/Alerta';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

const TablaGeneralProyects: FC<typeTablaProyectos> = () => {

  const { token,showSidebar } = useContext(GlobalContext)
  const [proyectosServer, setProyectosSever] = useState<typeDatosTablaProyectos[]>([])
  const[actualizarTabla,setActualizarTabla] = useState<number>(0)


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
  },[actualizarTabla])





  interface DataType {
    id: React.Key
    nombre: string
    organizacion: string
    estado: string
  }



  const columnas: ColumnsType<DataType> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      

      sorter: (a: DataType, b: DataType) => (a.nombre > b.nombre)?1:-1,
      width: '30%',
    },
    {
      title: 'Organizacion',
      dataIndex: 'organizacion',
      
      sorter: (a: DataType, b: DataType) => (a.organizacion > b.organizacion)?1:-1,
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
          text:  'Inactivo',
          value: 'Inactivo',
        },
      ],

      onFilter: (value: React.Key | boolean, record: DataType) => record.estado == value,
      filterSearch: true,
      width: '40%',
    },
  ];


  /**
   * data:typeDatosTablaProyectos[] 
   * 
   * modified data & data.key = id 
   */
  const data: typeDatosTablaProyectos[] = proyectosServer

  data.map((element:any,)=>element['key']=element.id)
  
  

  return <div className={`TablageneralProyects ${showSidebar?'MovDer':'MovIzq'}`}>
    
    <Table columns={columnas} size='middle' dataSource={data}   />

  </div>
}
export default TablaGeneralProyects