import {useState} from "react";

export function useForm(inputValues = {}) {
    const [values, setValues] = useState(inputValues);
    const handleChange = (e) => {
        //console.log(e.target.name)
        setValues({...values, [e.target.name]: e.target.value})
    };
    return {values, handleChange, setValues};

}