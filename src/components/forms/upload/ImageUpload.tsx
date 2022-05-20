import { Avatar, IconButton, Input, styled } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

//accept="image/*"

const ImageUpload = ({ ImagePath, onChange }:
    { ImagePath: string, onChange: any }) => {

    /*
            setFile(img);
            setUploadedFilePath(URL.createObjectURL(img));
            

            */

    //Remove the input field from showing up
    const Input = styled('input')({
        display: 'none',
    });
    return (

        <label htmlFor="icon-button-file" style={{ paddingTop: 10 }}>
            <Input id="icon-button-file" type="file"
                onChange={onChange} />
            <IconButton component="span" style={{ width: 64, height: 64, background: '#BDBDBD' }}>

                {((!ImagePath)) &&
                    <>
                        <PersonIcon style={{ width: 32, height: 32, color: '#FFFFFF' }} />
                    </>
                }
                {((ImagePath)) &&
                    <>
                        <Avatar style={{ width: 64, height: 64 }} src={ImagePath} />
                    </>
                }

            </IconButton>
        </label>
    )
}

export default ImageUpload