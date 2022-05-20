import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const ProfileButton = ({ onClick, sx, width, height }:
    { onClick: any, sx: any, width: number, height: number }) => {
    return (
        <IconButton style={{ width: width, height: height, background: '#BDBDBD' }} onClick={onClick} sx={sx}>
            <PersonIcon style={{ color: '#FFFFFF' }} />
        </IconButton>
    )
}

export default ProfileButton