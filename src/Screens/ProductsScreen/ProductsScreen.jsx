import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../../Hooks/productDetail'


const ProductScreen = () => {
    const {product_id} = useParams()
    console.log({product_id})

    const { product_detail_state, product_detail_loading, product_detail_error} = ProductDetails(product_id)

    return (
        <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <div>
                        <a class="navbar-brand">Detalles del producto</a>
                    </div>
                    <div>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <a class="btn btn-outline-dark mt-auto" href='/home'>Volver al inicio</a> 
                        <li class="nav-item dropdown"></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>{
                product_detail_loading 
                ? <h2>Cargando...</h2>
                :(
                product_detail_error 
                ? <h2>{product_detail_error}</h2>
                : <ProductDetail {...product_detail_state}/>
                )
                }
            </div>
    </body>
    )
}


const ProductDetail = ({title, price, stock, description, image, _id}) => {

const image_base_64 ="data:image/jpg;base64" + image.toString('base64')
return (

        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src={image} alt={title} width={'50'} />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">ID: {_id}</h5>
                                <h5 class="fw-bolder">{title}</h5>
                                <h5 class="fw-bolder">Precio: ${price}</h5>
                                <h5 class="fw-bolder">Stock: {stock}</h5>
                                <h5 class="fw-bolder">Descripcion: {description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}

export default ProductScreen