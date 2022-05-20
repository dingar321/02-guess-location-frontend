import { IconButton } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const addIcon = require('../../assets/icons/AddIcon.png') as string;
// <img alt='add-icon' src={addIcon} />
const AddButton = ({ onClick, sx, width, height }:
    { onClick: any, sx: any, width: number, height: number }) => {
    return (
        <IconButton style={{ width: width, height: height, background: '#619B8A' }} onClick={onClick} sx={sx}>
            <AddIcon style={{ color: '#FFFFFF' }} />
        </IconButton>
    )
}

export default AddButton