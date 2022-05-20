import { TextField } from '@mui/material'
import React from 'react'

//The default variant is the 'standard'

const RegularTextField = ({ value, width, height, onChange, label, variant, sx, error, helperText }:
    {
        value: string, width: number, height: number, onChange: any, label: string,
        variant: string, sx: any, error: boolean, helperText: string
    }) => {

    if (variant === 'outlined') {
        return (
            <TextField variant='outlined' label={label} required autoComplete='off'
                style={{ width: width, height: height }} sx={sx} error={error} helperText={helperText}
                onChange={onChange}
                value={value}
                type="text"
            />
        )
    } else {
        return (
            <TextField variant='standard' label={label} required autoComplete='off'
                style={{ width: width, height: height }} error={error} helperText={helperText}
                onChange={onChange}
                value={value}
                type="text"
            />
        )
    }


}

export default RegularTextField