import { createTheme } from "@mui/material";

//Default font of the website
const DefaultTheme = createTheme({
    typography: {
        //Remove tet transform from the butons
        button: {
            textTransform: 'none'
        },
    },
    //Custom breakpoints
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },


});

export default DefaultTheme;