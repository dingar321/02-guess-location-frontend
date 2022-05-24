import { Avatar, IconButton, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useRecoilState } from 'recoil'
import User from '../../utils/types/User';
import { UserState } from '../../utils/common/RecoilStates';

const BurgerProfileButton = ({ onClick, sx, buttonText, color, firstName, lastName, width, height }:
    { onClick: any, sx: any, buttonText: string, color: string, firstName: string, lastName: string, width: number, height: number }) => {

    //User state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    return (
        <IconButton onClick={onClick} sx={sx}
            style={{
                color: color, borderRadius: '4px', background: 'white', width: '300px', height: '40px',
                justifyContent: 'left', marginBottom: '30px', marginTop: '10px', marginRight: 100
            }}>

            {(!loggedUser) &&
                <PersonIcon style={{ color: '#FFFFFF' }} />
            }

            {(loggedUser) &&
                <Avatar src={loggedUser.s3Imagekey} />
            }

            <Typography sx={{ fontSize: '24px' }} style={{ paddingLeft: '30px' }}>
                {firstName} {lastName}
            </Typography>
        </IconButton>
    )
}

export default BurgerProfileButton