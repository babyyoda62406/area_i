import { RutaServer } from "../../../Helpers/RutaServer";
import { FetchService } from "../../../Services/FetchService";
import { tpDatosTablaUsers } from "../types/tabla";

export const getUSers = (
    token: string,
    
    setData: (arg: tpDatosTablaUsers[]) => void,
) => {

    FetchService(RutaServer.getUsuarios, {
        headers: {
            'Content-Type': 'application/json',
            "token": token
        }
    }
    )
        .then(async (res) => {
            switch (res.status) {

                case 200:
                    const elements = await res.json()
                    setData(elements)

                    break
                case 204:

                    break
                case 400:

                    break
              
            }
        })
        .catch(err=>console.log(err))


}