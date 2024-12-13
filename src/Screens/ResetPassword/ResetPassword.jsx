import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { extractFormData } from "../../Utils/extractFormData";
import {PUT, getunnauthenticatedHeaders } from "../../fetching/http.fetching";
import ENVIROMENT from "../../enviroment";


const ResetPassword = () => {
    const navigate = useNavigate()

    const reset_token = useParams()
    const handleSubmitResetForm = (e) => {
    e.preventDefault()
    const form_HTML = e.target
    const form_Values = new FormData(form_HTML)
    const form_fields = {
        'password': ''
    }
    
    const form_values_object = extractFormData(form_fields, form_Values)
    fetch(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/` + reset_token, {
        method: 'PUT',
        headers: getunnauthenticatedHeaders(), /* {
            'Content-Type': 'application/json' 
        }, */
        body: JSON.stringify(form_values_object)
        navigate('/login')
    })
        .then(
            (response) => {  
                return response.json()
            }
        )
        .catch(
            (error) => { console.error(error) }
        )
    }



    return (
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container px-4 px-lg-5">
            <div>
                <a class="navbar-brand">Restablecer contraseña</a>
            </div>
            <div>
                <p>Completa el formulario con la nueva contraseña para restablecerla.</p>
            </div>
                <form onSubmit={handleSubmitResetForm}>
                    <div>
                            <label htmlFor='password'>Ingrese su nueva contraseña:</label>
                            <input name='password' id='password' placeholder='contraseña' />
                    </div>
                            <button class="btn btn-outline-dark" type="submit">Restablecer contraseña</button>
                </form>
                <div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/login'>Si recuerdas tu contraseña has click aqui</a></div>
                    </div>
                    
                </div>
                <div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/register'>Si aun no tienes cuenta puedes Registrarte aqui</a></div>
                    </div>
                </div>
        </div>
    </nav>
</body>
  )
}
export default ResetPassword;