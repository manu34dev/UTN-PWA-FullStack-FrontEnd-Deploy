import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { extractFormData } from "../../Utils/extractFormData";
import { POST, getunnauthenticatedHeaders } from "../../fetching/http.fetching";
import ENVIROMENT from "../../enviroment";



const Login = () => {
    const navigate = useNavigate()

    const handleSubmitLoginForm = async(e) => {
        try {
            e.preventDefault()
            const form_HTML = e.target
            const form_values= new FormData(form_HTML)
            const form_fields = {
                'email': '',
                'password': ''
            }

            const formValuesObject = extractFormData(form_fields, form_values)
            
            const response = await POST (`${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
                headers: getunnauthenticatedHeaders(),
                body: JSON.stringify(formValuesObject)
            })
            if(response.payload.token === undefined) {
                console.log(response)
                return
            }
                
            const accessToken = response.payload.token
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
            navigate('/home')
        }
        catch (error) {
            console.log(error)
        }
        
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
            errorContainer.innerText = "El Email es Incorrecto"
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

    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand">Login</a>
                        <form onSubmit={handleSubmitLoginForm}>
                            <div>
                                <label htmlFor="email">Ingrese su email</label>
                                <input name="email" id="email" placeholder="mail@gmail.com" required="true" onBlur={onBlurEmail}/>
                            </div>
                            <div>
                                <label htmlFor="password">Ingrese su contraseña</label>
                                <input type ="password"name="password" id="password" placeholder="contraseña" required="true" onBlur={onBlurPassword}/>
                            </div>
                            <br />
                            <button class="btn btn-outline-dark" type="submit">Iniciar sesion</button>
                            <br />
                            <p id="error-msg" style={{visibility: "hidden", color: "red"}}>Email or Password is incorrect</p>
                        </form>
                    <div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/register'>Si aun no tienes cuenta puedes registrate aqui</a></div>
                        </div>
                        
                        </div>
                        <div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/forgot-password'>Si has olvidado tu contraseña puedes recuperarla aqui</a></div>
                        </div>
                    </div>
                </div>
            </nav>
        <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Compra con estilo</h1>
                <p class="lead fw-normal text-white-50 mb-0">Los mejores precios te esperan</p>
            </div>
        </div>
        </header>
        <br />
        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Proyecto UTN fullstack</p></div>
        </footer>
        
    </body>
    )
};

export default Login;