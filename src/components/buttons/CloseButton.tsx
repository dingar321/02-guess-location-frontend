import { IconButton } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';
// style={{ marginRight: '55px', borderRadius: '4px', background: 'white' }} 
const CloseButton = ({ onClick, sx }:
    { onClick: any, sx: any }) => {
    return (
        <IconButton onClick={onClick} sx={sx}
            style={{ color: '#619B8A', paddingTop: '10px', margin: 5, float: 'right' }} >
            <CloseIcon />
        </IconButton>
    )
}

export default CloseButton