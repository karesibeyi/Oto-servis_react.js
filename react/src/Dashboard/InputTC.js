import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function InputTC(props) {
    const handleChange = (value) => {
        var lastChar = value.slice(-1);
        if (parseInt(lastChar) == lastChar || lastChar == '') {
            if (value.length <= 11) props.onChange(value);
        }
    }

  

    return (
        <TextField
            value={props.value}
            label={props.label}
            onChange={(event) => handleChange(event.target.value)}
            variant="outlined"
            color="secondary"
            className={props.className}
        />
        
    )

   
}
