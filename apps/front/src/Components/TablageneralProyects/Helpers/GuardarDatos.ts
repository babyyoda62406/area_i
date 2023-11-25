import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { Item } from '../../../Interfaces/TableInterfaces';
import { typeDatosEnviarTabla } from '../../../Types/Tablas';
import { RutaServer } from '../../../Helpers/RutaServer';
import { FetchService } from '../../../Services/FetchService';
import { ALerta } from '../../../Services/Alerta';
import { reloadTabla } from '../services/ReloadTabla';



/**
 * 
 * @param key 
 * @param token 
 * @param form 
 * @param estadoProyecto 
 * @param data
 * @return '' 
 */
export const save = async (key: React.Key, token: string, form: any, estadoProyecto: string, data: Item[], setData: Function,setEditingKey:Function) => {

  try {
    form.setFieldValue('estado', estadoProyecto)
    const row = (await form.validateFields()) as Item;

    const newData = [...data];
    const index = newData.findIndex((item) => key === item.id);
    if (index > -1) {

      row.estado = estadoProyecto
      const item = newData[index];

      const datosEnviar: typeDatosEnviarTabla = {}
      // validacion de campos para generar un nuevo objeto con las propiedades modificadas
      row.nombre !== item.nombre ? datosEnviar.nombre = row.nombre : ''
      row.organizacion !== item.organizacion ? datosEnviar.organizacion = row.organizacion : ''
      row.estado !== item.estado ? datosEnviar.estado = row.estado : ''

      // url para hacer peticion PATH al server
      let newUrl = ` ${RutaServer.getProyectos}/${item.id}`
      console.log(datosEnviar)

      FetchService(newUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(datosEnviar),
      })
        .then(async (res: Response) => {
          switch (res.status) {

            case 200:
              const { message: mesSucces, newProyecto } = await res.json()
              ALerta({ title: mesSucces, icon: "success", position: 'top-right' })
              newData[index] = {
                ...newData[index],
                ...newProyecto
              }
              setData(newData)
              // reloadTabla()
              break;

            case 400:
              const { message: mesError } = await res.json()
              ALerta({ title: mesError, icon: "error", position: 'center' })
              break;

            case 409:
              const { message: mesErrorDat } = await res.json()
              ALerta({ title: mesErrorDat, icon: "error", position: 'center' })
              break;
            
            default:
              ALerta({title:'por favor revise su conexion', icon:'warning'})
          }
        })


       setEditingKey('');

    } else {
      console.log(row)
      newData.push(row);
      setData(newData);
       setEditingKey('');
    }
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};