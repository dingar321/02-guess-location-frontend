import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const DeleteButton = ({ onClick, sx }:
    { onClick: any, sx: any }) => {
    return (
        <IconButton onClick={onClick} sx={sx}
            style={{ background: '#9b6161', color: 'white', borderRadius: '4px', width: 40, height: 40 }} >
            <CloseIcon sx={{ fontSize: 35 }} />
        </IconButton>
    )
}

export default DeleteButton