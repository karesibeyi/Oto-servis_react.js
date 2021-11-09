import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function InputPhone(props) {
    const handleChange = (value) => {
        var lastChar = value.slice(-1);
        if (parseInt(lastChar) == lastChar || lastChar == ' ') {
            if (props.value <= value) {
                if (value.length > 16) return null;
                if (!(value.length < 4)) props.onChange(value);
                if (value.length == 7 || value.length == 11) props.onChange(value + ' ');
            } else {
                if (value.length >= 4) props.onChange(value);
            }
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
