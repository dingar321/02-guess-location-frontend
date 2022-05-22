import { Button, Grid, Hidden, IconButton, Input, styled } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContainedButton from '../../buttons/ContainedButton';
import { ContactlessOutlined } from '@mui/icons-material';
import DeleteButton from '../../buttons/DeleteButton';
import CloseIcon from '@mui/icons-material/Close';

const ImageUploade = ({ onChange, onClick, uploadedImagePath, uploadedImageName }:
    { onChange: any, onClick: any, uploadedImagePath: string, uploadedImageName: string }) => {

    //Remove the input field from showing up
    const Input = styled('input')({
        display: 'none',
    });

    return (
        <Grid container style={{ maxWidth: 860, display: 'inline' }} sx={{ pb: 2 }}>
            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {((!uploadedImagePath)) &&
                    <>
                        <div style={{ backgroundColor: 'white', border: '2px dashed #619B8A', width: '860px', height: '280px', color: '#619B8A', paddingTop: '120px', fontSize: 12 }}>
                            <p style={{ textAlign: 'center' }}>
                                No image uploaded <br />
                                <CameraAltIcon />
                            </p>
                        </div>
                    </>
                }
                {((uploadedImagePath)) &&
                    <>
                        <div style={{ backgroundColor: '#C8D7D4', border: '2px solid #619B8A', width: '860px', height: '280px', color: '#619B8A', fontSize: 12, textAlign: 'center' }}>
                            <img style={{ maxWidth: '470px', height: '276px', objectFit: 'contain', aspectRatio: '16 / 9' }} src={uploadedImagePath} />
                            <br />
                            <p style={{ float: 'left', paddingLeft: 30 }}> Image: {uploadedImageName}</p>
                        </div>
                    </>
                }
            </Grid>
            <Grid style={{ background: 'white', float: 'right' }} sx={{ mt: 2, mb: 0 }}>

                <label htmlFor="icon-button-file">
                    <Input id="icon-button-file" type="file" onChange={onChange} />
                    <IconButton component="span" style={{ background: 'white', borderRadius: 0, width: 200, height: 40 }}>
                        <Button disabled={true} style={{ width: 200, height: 40, background: "#619B8A", color: "#FFFFFF", fontSize: 16, fontWeight: 400 }}>UPLOAD IMAGE</Button>
                    </IconButton>
                </label>
                <IconButton onClick={onClick}
                    style={{ background: '#9b6161', color: 'white', borderRadius: '4px', width: 40, height: 40 }} >
                    <CloseIcon sx={{ fontSize: 35 }} />
                </IconButton>

            </Grid>
        </Grid >
    )
}

export default ImageUploade