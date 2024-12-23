import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { POST, getunnauthenticatedHeaders } from "../../fetching/http.fetching";
import ENVIROMENT from "../../enviroment";

const Register = () => {
    
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const form_fields = {
        'name': '',
        'email': '',
        'password': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(form_fields)

    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const form_HTML = e.target
        console.log(`${ENVIROMENT.URL_BACKEND}/api/auth/register`)
        const body = await POST (
            `${ENVIROMENT.URL_BACKEND}/api/auth/register`, 
            {
                headers: getunnauthenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
        
        console.log(body)
        
        navigate('/login')
    }

    const onBlurEmail = (e) =>
        {
            e.preventDefault()
            const value = e.target.value
    
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const isValid = pattern.test(value);
    
            const errorContainer = document.getElementById("error-msg");
    
            if(!isValid) {
                errorContainer.style.visibility = "visible";
                errorContainer.style.color = "red";
                errorContainer.innerText = "Debe ingresar un email"
            }
            else {
                errorContainer.style.visibility = "hidden";
                errorContainer.style.color = "red";
                errorContainer.innerText = ""
            }
        }

        const onBlurPassword = (e) => {
            e.preventDefault()
            const value = e.target.value
    
            const errorContainer = document.getElementById("error-msg");
    
            if(!isNaN(value)) {
                errorContainer.style.visibility = "visible";
                errorContainer.style.color = "red";
                errorContainer.innerText = "Debe ingresar un password"
            }
            else {
                errorContainer.style.visibility = "hidden";
                errorContainer.style.color = "red";
                errorContainer.innerText = ""
            }
        }

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

    
    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">Registrate en nuestra web</a>
                    <form onSubmit={handleSubmitRegisterForm}>
                        <div>
                            <label htmlFor="name">Ingrese su nombre </label>
                            <input name="name" id="name" placeholder="Marcos Molero" required="true"  onChange={handleChangeInputValue} />
                        </div>
                        <div>
                            <label htmlFor="email">Ingrese su e-mail </label>
                            <input name="email" id="email" placeholder="pepe@gmail.com" required="true" onBlur={onBlurEmail} onChange={handleChangeInputValue} />
                        </div>
                        <div>
                            <label htmlFor="password">Ingrese su contraseña </label>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="escriba su contraseña" required="true" onBlur={onBlurPassword} onChange={handleChangeInputValue}/>
                            <div className="input-group-append">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
                                    </button>
                                </div>
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