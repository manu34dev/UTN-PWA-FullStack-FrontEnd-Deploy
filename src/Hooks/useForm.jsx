import { useState } from "react"
const useForm = (form_fields) => {
    const [form_values_state, setFormValuesState] = useState(form_fields)

    const handleChangeInputValue = (e) => {
        const input_name = e.target.name
        const input_value = e.target.value
        setFormValuesState(
            (prev_form_values_state) =>{
                //lo que retorne esta callback se guardara como nuevo valor del estado
                return {...prev_form_values_state, [input_name]: input_value}
            }
        )
    }

    return{
        form_values_state,
        handleChangeInputValue
    }

}

export default useForm