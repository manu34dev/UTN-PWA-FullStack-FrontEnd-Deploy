import { useEffect, useState } from "react";
import { getauthenticatedHeaders, GET } from "../fetching/http.fetching";

    const useProducts = () => {
        const [products, setProducts] = useState([])
        const [isLoadingProducts, setIsLoadingProducts] = useState(true)
    
        const getProducts = async () => {
            const response = await GET('https://utn-pwa-full-stack-back-end-deploy.vercel.app/api/products', {
                headers: getauthenticatedHeaders()
            })
        
            console.log({response})
            if(response.ok){
                setProducts(response.payload.products)
                setIsLoadingProducts(false)
            }
            
        }
        useEffect(
            () => {
                getProducts()
            },
            []
        )
    
        return {products, isLoadingProducts}
    }
    

export default useProducts