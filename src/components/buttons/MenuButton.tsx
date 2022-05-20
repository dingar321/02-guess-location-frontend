import { IconButton } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const MenuButton = ({ onClick, sx }:
    { onClick: any, sx: any }) => {
    return (
        <IconButton onClick={onClick} sx={sx}
            style={{ color: '#619B8A', paddingTop: '10px', margin: 5, borderRadius: '4px' }} >
            <MenuIcon sx={{ fontSize: 35 }} />
        </IconButton>
    )
}

export default MenuButton