import { Avatar, IconButton, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const BurgerProfileButton = ({ onClick, sx, buttonText, color, firstName, lastName }:
    { onClick: any, sx: any, buttonText: string, color: string, firstName: string, lastName: string }) => {
    return (
        <IconButton onClick={onClick} sx={sx}
            style={{
                color: color, borderRadius: '4px', background: 'white', width: '300px', height: '40px',
                justifyContent: 'left', marginBottom: '30px', marginTop: '10px', marginRight: 100
            }}>
            <IconButton disabled style={{ background: '#BDBDBD' }}>
                <PersonIcon style={{ color: '#FFFFFF' }} />
            </IconButton>

            <Typography sx={{ fontSize: '24px' }} style={{ paddingLeft: '30px' }}>
                {firstName} {lastName}
            </Typography>
        </IconButton>
    )
}

export default BurgerProfileButton