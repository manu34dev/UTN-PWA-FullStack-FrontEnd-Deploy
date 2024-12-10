import React, { useEffect } from "react";
/* import { Link } from "react-router-dom"; */
import useProducts from "../../Hooks/useProducts";
import { getauthenticatedHeaders } from "../../fetching/http.fetching"


const Home = () => {
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    const {products, isLoadingProducts} = useProducts()
    console.log(products)

    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#!">Bienvenido {user_info.name}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href='/product/new'>Registra tu producto</a></li>
                        </ul>
                </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/'>Cerrar sesion</a></div>
                    </div>
            </div>
        </nav>
        <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Compra con estilo</h1>
                <p class="lead fw-normal text-white-50 mb-0">Los mejores precios estan aca</p>
            </div>
        </div>
        </header>
        <div>
        {
            isLoadingProducts 
            ? <span>Cargando....</span>
            : <ProductsList products={products}/>
            }
        </div>
        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Proyecto UTN fullstack</p></div>
        </footer>
    </body>
    )
}

const ProductsList = ({products}) => {
    return (
    <body>
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {    
                products.map(product => {
                    return <Product key={product.id} {...product} />
                })
            }
            </div>
        </div>
    </body>
    )
}

const ConfirmDeleteProduct = (id) => {
    const confirmResult = window.confirm("Confirma que desea eliminar el producto?")

    if(confirmResult) {
        DeleteProduct(id)
    }
}

const DeleteProduct = (product_id) => {

    fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: 'DELETE',
        headers: getauthenticatedHeaders()
    })
    .then((response) => { 
    console.log({ response }) 
    return response.json()
    })
    .catch((error) => { console.error(error) })
}

const Product = ({title, price, image, id}) => {
    return (
        
        <div class="col mb-5">
            <div class="card h-100">
                {/*> product image */}
                <img class="card-img-top" src={image} alt={title} width={'50'} />
                {/* product detail */}
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{title}</h5>
                        Precio: ${price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href={'/product/' + id}>Ir a detalle</a></div>
                </div>
                {/* <Link to={'/product/' + id}>Ir a detalle</Link> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href={'/product/' + id + '/edit'}>Editar producto</a></div>
                </div>
                {/* <Link to={'/product/' + id + '/edit'}>Editar producto</Link> */}
                
                <button onClick={() => ConfirmDeleteProduct(id) }>Eliminar el producto</button>
            </div>
        </div>
    )
}
export default Home;