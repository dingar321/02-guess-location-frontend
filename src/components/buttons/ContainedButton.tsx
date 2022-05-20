import { Button } from '@mui/material'
import React from 'react'

const ContainedButton = ({ buttonText, width, height, background, color, fontSize, fontWeight, type, onClick, sx }:
    { buttonText: string, width: number, height: number, background: string, color: string, fontSize: number, fontWeight: number, type: string, onClick: any, sx: any }) => {

    if (type === 'submit') {
        return (
            <div>
                {/* Submit button */}
                <Button type='submit' variant="contained" onClick={onClick} sx={sx}
                    style={{ width: width, height: height, background: background, color: color, fontSize: fontSize, fontWeight: fontWeight }}>
                    {buttonText}
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                {/* Standard button */}
                <Button type='button' variant="contained" onClick={onClick} sx={sx}
                    style={{ width: width, height: height, background: background, color: color, fontSize: fontSize, fontWeight: fontWeight }}>
                    {buttonText}
                </Button>
            </div>
        )
    }

}

export default ContainedButton