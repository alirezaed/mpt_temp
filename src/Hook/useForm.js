import * as React from 'react';


export default function useForm(defaultValue){

    const [value,setValue] = React.useState(defaultValue);

    //validation
    const onChange=(e)=>{

        setValue(e.target.value);

    }

    return {
        value,
        onChange
    }
}