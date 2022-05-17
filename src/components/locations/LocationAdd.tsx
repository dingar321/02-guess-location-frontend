import { Avatar, Box, Button, Container, Grid, IconButton, Input, styled, TextField, Typography } from '@mui/material'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import Pin from '../../common/models/Pin';
import mapTheme from '../../common/styles/map-theme'
import mapThemeMono from '../../common/styles/map-theme-mono'
import ButtonMd from '../buttons/ButtonMd';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios';

const locationPlaceholderImage = require('../../assets/images/locationPlaceholderImage.png') as string;
const markerIcon = require('../../assets/icons/markerIcon.png') as string;

const mapContainerStyle = {
    width: '860px',
    height: '200px'
}

const googleMapsOptions = {
    styles: mapThemeMono,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false
}


const LocationAdd = () => {

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //User provided values
    const [coordinates, setCoordinates] = useState<Pin>({ lat: 0.000000, lng: 0.000000 });
    const [cordChanged, setChordChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File>()
    const [uploadedFilePath, setUploadedFilePath] = useState<string>('')
    const [locationName, setLocationName] = useState<string>('');

    //Google api key
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, });

    useEffect(() => {
        if (cordChanged) {
            setChordChanged(false);
            const options = {
                method: 'GET',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}`,
            };

            axios.request(options).then(function (response) {
                //console.log(response.data.results[2].formatted_address);
                setLocationName(response.data.results[2].formatted_address)
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, [cordChanged])

    useEffect(() => {

    }, [locationName])

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    //Remove the input field from showing up
    const Input = styled('input')({
        display: 'none',
    });


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        let img = e.target.files[0];
        // handle the input...x
        //console.log(img);
        setFile(img);
        setUploadedFilePath(URL.createObjectURL(img));
    }

    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (coordinates.lat != 0.000000 && coordinates.lng != 0.000000
            && locationName != '' && file) {
            {/* Provided values are valid */ }
            var lat = coordinates.lat;
            var lng = coordinates.lng;

            console.log(JSON.stringify({ locationName, lat, lng, file }));

        } else if (coordinates.lat == 0.000000 && coordinates.lng == 0.000000
            && locationName == '' && !file) {
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
        else if (!file) {
            setErrorMessage('Please upload an image');
            console.log('Error');
            errorRef.current?.focus();
        }
    };


    return (
        <Container style={{ maxWidth: '860px' }} component="form" noValidate={true} onSubmit={handleSubmit} sx={{ my: '2em' }}>
            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Typography style={{ fontSize: 34, fontWeight: 400, color: '#233D4D' }}>
                    Add a new <span style={{ color: '#92baaf' }}> location</span>.
                </Typography>

            </Grid>
            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} sx={{ pb: 2 }}>
                <label htmlFor="icon-button-file">
                    <Input id="icon-button-file" type="file" onChange={handleChange} />
                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ borderRadius: 0, width: '470px', height: '280px', aspectRatio: '16 / 9' }}>
                        {((!uploadedFilePath)) &&
                            <>
                                <div style={{ backgroundColor: 'white', border: '2px dashed #c2cdda', width: '470px', height: '280px', color: '#c2cdda', paddingTop: '25%', fontSize: 12, position: 'absolute' }}>
                                    Image not uploaded<br />
                                    <CameraAltIcon />
                                </div>
                            </>
                        }
                        {((uploadedFilePath)) &&
                            <>
                                <img style={{ borderRadius: 0, maxWidth: '470px', height: '280px', objectFit: 'fill', aspectRatio: '16 / 9' }} src={uploadedFilePath} />
                            </>
                        }
                    </IconButton>
                </label>
            </Grid>

            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #619B8A' }} sx={{ pt: 0 }}>
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={coordinates} options={googleMapsOptions}
                    onClick={(e) => {
                        setCoordinates({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number });
                        setChordChanged(true);
                    }}>

                    {((coordinates.lat !== 0.000000 && coordinates.lng !== 0.000000)) &&
                        < Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} icon={{ url: markerIcon, scaledSize: new window.google.maps.Size(30, 30) }} />
                    }

                </GoogleMap>
            </Grid>
            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} sx={{ pt: 2 }}>
                <TextField label="Location name, select a location on the map" disabled={true} type="text" required autoComplete='off' placeholder='' variant="outlined" style={{ width: 810, height: 14 }}
                    onChange={(e) => setLocationName(e.target.value)} value={locationName} />
            </Grid >
            <Grid style={{ background: 'white', display: 'flex', float: 'right' }} sx={{ pt: 6 }}>
                <Button type="submit" style={ButtonMd}>ADD</Button>
            </Grid>
            <Box style={{ color: 'red', textAlign: 'justify', paddingTop: 20 }}>
                {/* TODO: Move to a dialog <--------------------------------- */}
                <Typography ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</Typography>
            </Box>

        </Container >
    )
}

export default LocationAdd;