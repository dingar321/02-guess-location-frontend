import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useRecoilState } from 'recoil'
import User from '../../utils/types/User';
import { UserState } from '../../utils/common/UserRecoil';


const ProfileButton = ({ onClick, sx, width, height }:
    { onClick: any, sx: any, width: number, height: number }) => {

    //User state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    return (
        <IconButton style={{ width: width, height: height, background: 'bebebe' }} onClick={onClick} sx={sx}>

            {(!loggedUser) &&
                <PersonIcon style={{ color: '#FFFFFF' }} />
            }

            {(loggedUser) &&
                <Avatar src={loggedUser.s3Imagekey} />
            }

        </IconButton>
    )
}

export default ProfileButton