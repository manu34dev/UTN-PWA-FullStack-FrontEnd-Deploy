import React, { useEffect } from "react";
import useProducts from "../../Hooks/useProducts";
import { DELETE, getauthenticatedHeaders } from "../../fetching/http.fetching"
import ENVIROMENT from "../../enviroment";


const Home = () => {
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    const {products, isLoadingProducts} = useProducts()
    console.log(user_info)
    console.log(products)

    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#!">Bienvenido {user_info.name}</a>
                <div>
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
            : <ProductsList products={products} user_id={user_info.id}/>
            }
        </div>
        <footer class="py-5 bg-dark">
        <div class="container" ><p class="m-0 text-center text-white">Copyright &copy;  <a href="https://sceu.frba.utn.edu.ar/presencial/">Proyecto UTN fullstack</a></p></div>
        <div class="container"><p class="m-0 text-center text-white">Powered by <a href="https://vercel.com">Vercel</a></p></div>
        </footer>
    </body>
    )
}

const ProductsList = ({products, user_id}) => {
    return (
    <body>
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {    
                products.map(product => {
                    product.user_id = user_id
                    return <Product key={product.id} {...product} />
                })
            }
            </div>
        </div>
    </body>
    )
}

const ConfirmDeleteProduct = async (id) => {
    const confirmResult = window.confirm("Confirma que desea eliminar el producto?")

    if(confirmResult) {
        await DeleteProduct(id)
    }
}

const DeleteProduct = async (product_id) => {

    await DELETE(
        `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, 
        {
            headers: getauthenticatedHeaders()
        }
    )
    .then((response) => { 
        console.log({ response }) 
        return response.json()
    })
    .catch((error) => { console.error(error) })
}

const Product = ({title, price, image, id, seller_id, user_id}) => {
    return (
        
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src={image} alt={title} width={'50'} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{title}</h5>
                        Precio: ${price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href={'/product/' + id}>Ir a detalle</a></div>
                </div>
                        
                        { seller_id == user_id
                            && 
                            <>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center">
                                        <a class="btn btn-outline-dark mt-auto" href={'/product/' + id + '/edit'}>Editar producto</a>
                                    </div>
                                </div>
                                <button onClick={() => ConfirmDeleteProduct(id)} className="btn btn-outline-danger">
                                    Eliminar el producto
                                </button>
                            </>
                        }
            </div>
        </div>
    )
}
export default Home;