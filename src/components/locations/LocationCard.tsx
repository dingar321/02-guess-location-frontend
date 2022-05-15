import { Button, ButtonBase, Card, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import User from '../../common/models/User';

//Effects: gradiant
//https://cssgradient.io/

//Font:
const poppinsFont = "'Poppins', sans-serif";

//Images
const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;
const EditIcon = require('../../assets/icons/edit-icon.png') as string;
const LockIcon = require('../../assets/icons/lock-icon.png') as string;
const GuessFilter = require('../../assets/filters/guess-filter.png') as string;

const LocationCard = ({ width, height }: { width: number, height: number }) => {
    //The ability to have diffrent sized cards
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);

    //If user exists
    const [user, setUser] = useState<User>();
    const [userLogged, setUserLogged] = useState<boolean>(true);

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    return (
        <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} elevation={1}>
            {((userLogged)) &&
                <>
                    <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                        image="https://www.museos.com/wp-content/uploads/2021/02/Eiffelturm-Paris6-scaled.jpg" /> {/* <-- Image*/}
                    <IconButton style={{ position: "absolute", borderRadius: 10 }}>
                        <img src={EditIcon} />
                    </IconButton >
                </>
            }

            {((!userLogged)) &&
                <>
                    <ButtonBase disabled component="div" style={{ width: cardWidth, height: cardHeight, position: "relative" }}>
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                            image="https://www.museos.com/wp-content/uploads/2021/02/Eiffelturm-Paris6-scaled.jpg" /> {/* <-- Image*/}
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={GuessFilter} />
                        <IconButton disabled style={{ width: 24, height: 32, position: "absolute", borderRadius: 10 }}>
                            <img style={{ width: 24, height: 32 }} src={LockIcon} />
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