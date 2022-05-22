import { Container, Grid, Typography } from '@mui/material'
import LocationAddForm from '../components/forms/LocationAddForm';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';

const LocationAdd = () => {

    return (
        <div className="app" >
            <div>
                <Header />
                <div>
                    <LocationAddForm />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default LocationAdd;