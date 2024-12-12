import React from "react";
import { DELETE, getauthenticatedHeaders } from "../../fetching/http.fetching"
import ENVIROMENT from "../../enviroment";


const DeleteProduct = async (product_id) =>{
    /* const product_id = useParams().product_id */

    const product_detail_response = await DELETE(
        `${ENVIROMENT.URL_BACKEND}/api/products/:product_id`, 
        {
            headers: getauthenticatedHeaders()
        }
    )
    //Condiciones / manejo de errores de la peticion
    setProductDetailLoading(false)
    if(product_detail_response.ok){
        setProductDetailState(product_detail_response.payload.product)
    }   
    else{
        //navigate('/home')
        //Aca les dejo el centro para manejar los errores
        setProductDetailError(product_detail_response.payload.detail)
    }


return (
    <div>
    <button onClick={() => DeleteProduct(product_id)}>Eliminar</button>
    </div>
    )
}
export default DeleteProduct