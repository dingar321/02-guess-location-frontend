import { Grid, Hidden } from "@mui/material"
import SignupForm from "../components/forms/SignupForm"
import FormHeader from "../components/layouts/header/FormHeader"
import HamburgerHeader from "../components/layouts/header/HamburgerHeader";

const rightSideImage = require('../assets/images/RightSideImage.png') as string;

const Signup = () => {


    return (
        <Grid container>

            <Hidden mdDown>
                {/* Browser */}
                <Grid item xs={12} sm={6} style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                    <FormHeader />
                    <div />
                    <SignupForm />
                    <div />
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <img src={rightSideImage} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} alt="right-side" />
                </Grid>
            </Hidden >

            <Hidden mdUp>
                {/* Devices */}
                <HamburgerHeader />
                <Grid item xs={12} sm={12} style={{ paddingTop: '18em' }}>
                    <SignupForm />
                </Grid>
            </Hidden>

        </Grid>
    )
}

export default Signup



