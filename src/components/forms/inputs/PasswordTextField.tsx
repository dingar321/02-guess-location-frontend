import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

//The default variant is the 'standard'

const standardStyle = {
    floatingLabelFocusStyle: {
        color: '#233D4D',
    }
}

const PasswordTextField = ({ value, width, height, onChange, variant, sx, label, error, helperText }:
    {
        value: string, width: number, height: number, onChange: any,
        variant: string, sx: any, label: string, error: boolean, helperText: string
    }) => {

    //Showing the password
    const [passwordShow, setPasswordShow] = useState<boolean>(false);

    //Hiding and showing the password
    const handleClickPasswordShow = () => {
        if (passwordShow) {
            setPasswordShow(false);
        }
        if (!passwordShow) {
            setPasswordShow(true);
        }
    };

    if (variant === 'outlined') {
        return (
            <TextField variant='outlined' label={label} required autoComplete='off'
                style={{ width: width, height: height }} sx={sx}
                onChange={onChange} error={error} helperText={helperText}
                id={"outlined-adornment" + label}
                type={passwordShow ? "text" : "password"}
                value={value}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickPasswordShow}
                                edge="end" >
                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        )
    } else {
        return (
            <TextField variant="standard" label="Password" required autoComplete='off' placeholder=''
                style={{ width: width, height: height }} sx={sx}
                onChange={onChange} error={error} helperText={helperText}
                id={"outlined-adornment" + label}
                type={passwordShow ? "text" : "password"}
                value={value}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickPasswordShow}
                                edge="end" >
                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        )
    }
}

export default PasswordTextField