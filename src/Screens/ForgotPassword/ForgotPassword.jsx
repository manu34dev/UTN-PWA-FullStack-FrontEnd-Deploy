import React from "react";
import { Link } from "react-router-dom";
import { extractFormData } from "../../Utils/extractFormData";
import { POST, getunnauthenticatedHeaders } from "../../fetching/http.fetching";
import ENVIROMENT from "../../enviroment";


const ForgotPassword = () => {

	const handleSubmitLoginForm = async (e) => {
		try {
			e.preventDefault()
			const form_HTML = e.target
			const form_Values = new FormData(form_HTML)
			const form_fields = {
				'email': ''
			}
			const form_values_object = extractFormData(form_fields, form_Values)
			console.log(form_values_object)
			const body = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, 
			{
				headers: getunnauthenticatedHeaders(),
				body: JSON.stringify(form_values_object)
			})
			//const body = await sendEmailForgot(form_values_object)
			//Si hubiera algun error, lo imprimen usando el valor de body
			//Por ejemplo, pueden cambiar el estado para que aparezca un error
			//De ser necesario cambien como responde su backend
			if (!body.ok) {
				//setError()
			}
			console.log({ body })
		}
		catch (error){
			//Errores se manejan aqui
		}
	}

	return (
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container px-4 px-lg-5">
			<a class="navbar-brand" href="#!">Olvide mi contraseña</a>
			<div>
				<p>Enviaremos un mail a tu correo para enviarte los pasos de recuperacion de contraseña.</p>
			</div>
				<form onSubmit={handleSubmitLoginForm}>
					<div>
						<label htmlFor='email'>Ingrese su email:</label>
						<input name='email' id='email' placeholder='pepe@gmail.com' />
					</div>
					<br />
					<button class="btn btn-outline-dark" type="submit">Enviar correo</button>
				</form>
				<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/login'>Si ya tienes una cuenta has click aqui</a></div>
                </div>
				<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/register'>Si aun no tienes cuenta has click aqui</a></div>
                </div>
			</div>
		</nav>
	</body>
	)
}


export default ForgotPassword;