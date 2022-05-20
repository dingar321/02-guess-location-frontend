import { Button } from '@mui/material'
import React from 'react'

const TextButton = ({ buttonText, width, height, color, fontSize, fontWeight, onClick, type, sx }:
    { buttonText: string, width: number, height: number, color: string, fontSize: number, fontWeight: number, onClick: any, type: string, sx: any }) => {

    if (type === 'submit') {
        return (
            <Button type='submit' disableRipple variant="text" onClick={onClick} sx={sx}
                style={{ width: width, height: height, color: color, fontSize: fontSize, fontWeight: fontWeight, lineHeight: '19px', }}>
                {buttonText}
            </Button>
        )
    } else {
        return (
            <Button type='button' disableRipple variant="text" onClick={onClick} sx={sx}
                style={{ width: width, height: height, color: color, fontSize: fontSize, fontWeight: fontWeight }}>
                {buttonText}
            </Button>
        )
    }

}

export default TextButton