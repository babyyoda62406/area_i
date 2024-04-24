import { GridRowId } from "@mui/x-data-grid"
import { tpDataOrganizations } from "../Types/DataOrganizations"

export interface ItfFormAddOrg {
    setShowModal:()=>void
}

export interface ItfFormUpdateOrg {
    data: tpDataOrganizations
    id:GridRowId
    setShowModal:(arg:boolean)=>void
}