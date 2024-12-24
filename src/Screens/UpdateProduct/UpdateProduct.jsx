import { useNavigate, useParams } from "react-router-dom"
import { extractFormData } from "../../Utils/extractFormData"
import { getauthenticatedHeaders } from "../../fetching/http.fetching"
import ENVIROMENT from "../../enviroment"

const UpdateProduct = () => {
    const navigate = useNavigate()
    const {product_id} = useParams()

    console.log(product_id)

    const handleSubmitUpdateProduct = (e) => {
        e.preventDefault()
        const form_HTML = e.target
        const form_values = new FormData(form_HTML)
        const form_fields = {
            title: '',
            description: '',
            price: '',
            stock: '',
            category: '',
        }
        const formValuesObject = extractFormData(form_fields, form_values)
        fetch(`${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, {
            method: 'PUT',
            headers: getauthenticatedHeaders(),
            body: JSON.stringify(formValuesObject)
        })
        .then(
            (response) => { 
                return response.json()
            }
        )
        navigate('/home')
        .catch(
            (error) => { console.error(error) }
        )
    }

    return (
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand">Actualiza tu producto</a>
                    <form onSubmit={handleSubmitUpdateProduct}>
                        <div>
                            <label htmlFor="title">ingrese nuevo titulo</label>
                            <input name="title" type="text" id="title" />
                        </div>
                        <div>
                            <label htmlFor="description">ingrese nueva descripcion</label>
                            <textarea name="description" id="description"></textarea>
                        </div>
                        <div>
                            <label htmlFor="price">ingrese nuevo precio</label>
                            <input name="price" type="text" id="price"/>
                        </div>
                        <div>
                            <label htmlFor="stock">ingrese nuevo stock</label>
                            <input name="stock" type="text" id="stock"/>
                        </div>
                        <div>
                            <label htmlFor="category">ingrese nueva categoria</label>
                            <input name="category" type="text" id="category"/>
                        </div>
                        <br />
                        <button class="btn btn-outline-dark" type="submit">Actualizar producto</button>
                    </form>
                    <div>
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/home'>Volver al inicio</a></div>
                    </div>
            </div>
        </nav>
    </body>
    )
}

export default UpdateProduct