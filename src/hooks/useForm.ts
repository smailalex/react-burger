import {ChangeEvent, useState} from "react";

export function useForm(inputValues:{[key:string]:string} = {}) {
    const [values, setValues] = useState(inputValues);
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //console.log(e.target.name)
        setValues({...values, [e.target.name]: e.target.value})
    };
    return {values, handleChange, setValues};

}