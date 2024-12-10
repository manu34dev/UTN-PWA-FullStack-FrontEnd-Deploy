import { useEffect, useState } from "react"
import { getauthenticatedHeaders, GET  } from "../fetching/http.fetching"
import { useNavigate } from "react-router-dom"

const ProductDetails = (product_id) =>{
    const [product_detail_state, setProductDetailState] = useState(null)
    const [product_detail_loading, setProductDetailLoading] = useState(true)
    const [product_detail_error, setProductDetailError] = useState(null)
    const navigate = useNavigate()
    const getProductDetail = async (product_id) =>{
        const product_detail_response = await GET(
            `http://localhost:3000/api/products/${product_id}`, 
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
    }

    useEffect(
        () =>{
            getProductDetail(product_id)
        },
        []
    )
    return {
        product_detail_state, 
        product_detail_loading, 
        product_detail_error
    }
}

export default ProductDetails