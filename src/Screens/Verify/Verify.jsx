import React from "react";
import { useParams } from 'react-router-dom'
import { GET, getunnauthenticatedHeaders } from "../../fetching/http.fetching";


const Verify = () => {

    const {token} = useParams()

    const response = GET (
        `https://utn-pwa-full-stack-back-end-deploy.vercel.app/api/auth/verify/${token}`,
        {
            headers: getunnauthenticatedHeaders()
        })
        console.log(response)

    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">Bienvenido</a>
                <div>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <a class="btn btn-outline-dark mt-auto" href='/home'>Iniciar Sesion</a>
                    </ul>
                </div>
            </div>
        </nav>
        <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Verificacion exitosa!</h1>
                <p class="lead fw-normal text-white-50 mb-0">Hace click en el boton de arriba para ir al sitio</p>
            </div>
        </div>
        </header>
    </body>
    )

}
export default Verify;