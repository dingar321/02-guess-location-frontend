import { Button } from '@mui/material'
import React from 'react'

const OutlinedButton = ({ buttonText, width, height, background, color, fontSize, fontWeight, type, onClick, sx, borderColor }:
    {
        buttonText: string, width: number, height: number, background: string, color: string, fontSize: number, fontWeight: number,
        type: string, onClick: any, sx: any, borderColor: string
    }) => {

    if (type === 'submit') {
        return (
            <div>
                {/* Submit button */}
                <Button type='submit' variant="outlined" onClick={onClick} sx={sx}
                    style={{
                        width: width, height: height, background: background, color: color, fontSize: fontSize,
                        fontWeight: fontWeight, border: '1px solid', borderColor: borderColor
                    }}>
                    {buttonText}
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                {/* Standard button */}
                <Button type='button' variant="outlined" onClick={onClick} sx={sx}
                    style={{
                        width: width, height: height, background: background, color: color, fontSize: fontSize,
                        fontWeight: fontWeight, border: '1px solid', borderColor: borderColor
                    }}>
                    {buttonText}
                </Button>
            </div>
        )
    }

}

export default OutlinedButton