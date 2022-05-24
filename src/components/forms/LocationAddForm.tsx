import { Box, Button, Container, Grid, Hidden, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pin from '../../utils/types/Pin';
import Maps from '../map/Maps';
import ImageUpload from './upload/ImageUpload';

const LocationAddForm = () => {

    //navigation between pages
    const navigate = useNavigate();

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //User provided values
    const [coordinates, setCoordinates] = useState<Pin>({ lat: 0.000000, lng: 0.000000 });
    const [cordChanged, setChordChanged] = useState<boolean>(false);
    const [image, setImage] = useState<File>()
    const [uploadedImagePath, setUploadedImagePath] = useState<string>('')
    const [uploadedImageName, setUploadedImageName] = useState<string>('')
    const [locationName, setLocationName] = useState<string>('');

    //setting location after selecting a location on the map
    useEffect(() => {
        if (cordChanged) {
            setChordChanged(false);
            axios({
                method: 'GET',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}`,
            }).then(async function (response) {
                //Getting the location name
                setLocationName(response.data.results[2].formatted_address)
            }).catch(error => {
                setLocationName('Unknown');
                console.error('Error: ', error);
            });
        }
    }, [cordChanged])

    //Submiting the form 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (coordinates.lat != 0.000000 && coordinates.lng != 0.000000
            && locationName != '' && image) {
            {/* Provided values are valid */ }

            var bodyFormData = new FormData();
            bodyFormData.append('locationName', locationName);
            bodyFormData.append('latitude', coordinates.lat as any);
            bodyFormData.append('longitude', coordinates.lng as any);
            bodyFormData.append('locationImage', image);

            //For testing
            //console.log('Added locations cords: ', coordinates.lat, coordinates.lng);

            axios({
                method: "POST",
                url: "http://localhost:3333/location/add",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }).then(function (response) {
                //Empty all of the fields
                setCoordinates({ lat: 0.000000, lng: 0.000000 });
                setChordChanged(false);
                setImage(undefined);
                setUploadedImagePath('');
                setUploadedImageName('');
                setLocationName('');
                //After succesfull registration we navigate to singing
                navigate("/");
            }).catch(error => {
                console.log(error);
                errorRef.current?.focus();
            });

        } else if (coordinates.lat == 0.000000 && coordinates.lng == 0.000000
            && locationName == '' && !image) {
            {/* Some of the provided values are empty */ }
            setErrorMessage('Please select a location and upload an image');
            console.log('Error');
            errorRef.current?.focus();
        } else if (coordinates.lat == 0.000000 && coordinates.lng == 0.000000
            && locationName == '') {
            setErrorMessage('Please select a location');
            console.log('Error');
            errorRef.current?.focus();
        }
        else if (!image) {
            setErrorMessage('Please upload an image');
            console.log('Error');
            errorRef.current?.focus();
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        } else {
            let img = e.target.files[0];
            setImage(img);
            setUploadedImageName(img.name);
            setUploadedImagePath(URL.createObjectURL(img));
        }
    }

    return (
        <Container style={{ maxWidth: 865 }}>
            <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{}}>

                <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography style={{ fontSize: 34, fontWeight: 400, color: '#233D4D' }}>
                        Add a new <span style={{ color: '#92baaf' }}> location</span>.
                    </Typography>
                </Grid>


                <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* Image upload */}
                    <ImageUpload onChange={handleChange} uploadedImageName={uploadedImageName} uploadedImagePath={uploadedImagePath}
                        onClick={(e: any) => {
                            setImage(undefined);
                            setUploadedImagePath('');
                            setUploadedImageName('');
                        }} />
                </Grid>

                <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* Google maps */}
                    <Maps locationName={locationName} coordinates={coordinates} onChange={(e: any) => setLocationName(e.target.value)} onClick={(e: any) => {
                        setCoordinates({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number });
                        setChordChanged(true);
                    }} />
                </Grid>

                {/* Submit button */}
                <Grid style={{}} sx={{ mt: 8 }}>
                    <Button type='submit' style={{ float: 'right', width: 137, height: 40, background: "#619B8A", color: "#FFFFFF", fontSize: 16, fontWeight: 400 }}>ADD</Button>
                </Grid>

                <Box style={{ color: 'red', paddingTop: 10 }}>
                    {/* TODO: Move to a dialog <--------------------------------- */}
                    <Typography ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</Typography>
                </Box>
            </Box >
        </Container >
    )
}

export default LocationAddForm







/*
                    <Hidden mdDown>
                        <Button type='submit' style={{ float: 'right', width: 137, height: 40, background: "#619B8A", color: "#FFFFFF", fontSize: 16, fontWeight: 400 }}>ADD</Button>
                    </Hidden>
                    <Hidden mdUp>
                        <Button type='submit' style={{ float: 'right', width: '100%', height: 40, background: "#619B8A", color: "#FFFFFF", fontSize: 16, fontWeight: 400 }}>ADD</Button>
                    </Hidden>

*/