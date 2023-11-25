import { Item } from "../../../Interfaces/TableInterfaces";

/**
 * 
 * @param setEditingKey 
 * @param form 
 * @param record 
 * @return void
 */
export const EditarFIla = (setEditingKey: Function, form: any, record: Partial<Item> & { key: React.Key }) => {
  
  form.setFieldsValue({ nombre: '', organizacion: '', estado: '', ...record });
  setEditingKey(record.key);
}