import { Button, ButtonBase, Card, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserState } from '../../utils/common/UserRecoil';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'

const poppinsFont = "'Poppins', sans-serif";
const editIcon = require('../../assets/icons/EditIcon.png') as string;
const lockIcon = require('../../assets/icons/LockIcon.png') as string;
const guessGradient = require('../../assets/filters/GuessGradient.png') as string;

const LocationCard = ({ width, height }: { width: number, height: number }) => {
    //The ability to have diffrent sized cards
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);

    //If user exists
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    return (
        <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} elevation={1}>
            {((loggedUser)) &&
                <>
                    <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                        image="https://www.museos.com/wp-content/uploads/2021/02/Eiffelturm-Paris6-scaled.jpg" /> {/* <-- Image*/}
                    <IconButton style={{ position: "absolute", borderRadius: 10 }}>
                        <img src={editIcon} />
                    </IconButton >
                </>
            }

            {((!loggedUser)) &&
                <>
                    <ButtonBase disabled component="div" style={{ width: cardWidth, height: cardHeight, position: "relative" }}>
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                            image="https://www.museos.com/wp-content/uploads/2021/02/Eiffelturm-Paris6-scaled.jpg" /> {/* <-- Image*/}
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={guessGradient} />
                        <IconButton disabled style={{ width: 24, height: 32, position: "absolute", borderRadius: 10 }}>
                            <img style={{ width: 24, height: 32 }} src={lockIcon} />
                        </IconButton >
                    </ButtonBase>
                    {/*
                     */}
                </>
            }
        </Card >
    )
}

export default LocationCard