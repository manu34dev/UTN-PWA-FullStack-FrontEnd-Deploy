import React from "react";
import { Link } from "react-router-dom";
import { getauthenticatedHeaders, POST } from "../../fetching/http.fetching";
import { extractFormData } from "../../Utils/extractFormData";

const CreateProduct = () => {

    const [image, setImage] = React.useState('')
    const handleSubmitNewProduct = async(e) => {
        try {
            e.preventDefault()
        const form_HTML = e.target
        const form_values= new FormData(form_HTML)
        const form_fields = {
            title : '',
            description : '',
            price : '',
            stock : '',
            category : '',
        }
        const formValuesObject = extractFormData(form_fields, form_values)
        formValuesObject.image = image
        const response = await POST ('https://utn-pwa-full-stack-back-end-deploy.vercel.app/api/products', {
            headers: getauthenticatedHeaders(),
            body: JSON.stringify(formValuesObject)
        })
        console.log(response)
        
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
        const reader = new FileReader() 
        reader.onloadend = 
            () => {
            console.log('File Loaded')
            setImage(reader.result)
        }
        if (file_found) {
            reader.readAsDataURL(file_found)
        }
    }

    return (
    <body> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">Registre su producto</a>
                        <form onSubmit ={handleSubmitNewProduct} >
                            <div >
                                <label htmlFor="title">Ingrese el nombre del producto</label>
                                <input name="title" id="title" placeholder="Producto" required/>
                            </div>
                            <div>
                                <label htmlFor="description">Ingrese una descripcion</label>
                                <textarea name="description" id="description" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="price">Ingrese el precio del producto</label>
                                <input name="price" id="price" placeholder="100" required/>
                            </div>
                            <div>
                                <label htmlFor="stock">Ingrese el stock de su producto</label>
                                <input name="stock" id="stock" placeholder="10" required/>
                            </div>
                            <div>
                                <label htmlFor="category">Ingrese la categoria</label>
                                <input name="category" id="category" placeholder="Electronica" required/>
                            </div>
                            <div>
                                {
                                image && 
                                    <img src={image} alt={image} height="100px" width="100px"/>
                                }
                                <label htmlFor="image">Seleccione una imagen</label>
                                <input name="image" id="image" type="file" onChange={handleChangeFile} accept="image/*" required/>
                            </div>
                            <br />
                            <button class="btn btn-outline-dark" type="submit">Crear producto</button>
                        </form>
                        <div>
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href='/home'>Volver al inicio</a></div>
                        </div>
            </div>
        </nav>
    </body>
    )

}

export default CreateProduct