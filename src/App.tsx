import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';

//Themes
import DefaultTheme from './common/styles/default-theme';
import './common/styles/App.css';

//Components 
import Header from './components/navbar/Header';
import Footer from './components/footer/Footer';
import Test from './components/test';
import Signin from './components/signup/Signin';

function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="app" >
        <div>
          {/*  <Header /> */}
          <div className='main'>


            {/* Main  */}
            <Signin />


          </div>
        </div>
        {/* <Footer /> */}
      </div >
    </ThemeProvider>

  );
}

export default App;
