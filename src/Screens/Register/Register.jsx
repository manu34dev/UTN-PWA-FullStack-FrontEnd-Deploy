import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { POST, getunnauthenticatedHeaders } from "../../fetching/http.fetching";
const BACK_URL = import.meta.env.VITE_BACK_URL

const Register = () => {
    
    const navigate = useNavigate()

    const form_fields = {
        'name': '',
        'email': '',
        'password': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(form_fields)

    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const form_HTML = e.target

        const body = await POST (
            `${BACK_URL}/api/auth/register`, 
            {
                headers: getunnauthenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
        
        console.log(body)
        
        navigate('/login')
    }
    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">Registrate en nuestra web</a>
                    <form onSubmit={handleSubmitRegisterForm}>
                        <div>
                            <label htmlFor="name">Ingrese su nombre </label>
                            <input name="name" id="name" placeholder="Guadalupe Gamarra" onChange={handleChangeInputValue} />
                        </div>
                        <div>
                            <label htmlFor="email">Ingrese su e-mail </label>
                            <input name="email" id="email" placeholder="pepe@gmail.com" onChange={handleChangeInputValue} />
                        </div>
                        <div>
                            <label htmlFor="password">Ingrese su contraseña </label>
                            <input type="password" name="password" id="password" placeholder="escriba su contraseña" onChange={handleChangeInputValue}/>
                        </div>
                        <button class="btn btn-outline-dark" type="submit">Registrarse</button>
                    </form>
                    <br />
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/login'>Si ya tienes una cuenta has click aqui</a></div>
                    </div>
                
            </div>
        </nav>
        <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Se nuestro cliente</h1>
                <p class="lead fw-normal text-white-50 mb-0">Promos exclusivas hechas a tu medida</p>
            </div>
        </div>
        </header>
        <br />
        <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Proyecto UTN fullstack</p></div>
        </footer>
    </body>
        )

}
export default Register;