import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';

//Themes
import DefaultTheme from './common/styles/default-theme';
import './common/styles/App.css';

//Components 
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Test from './components/test';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Profile from './components/profile/Profile';

function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="app" >
        <div>
          <Header />
          <div className='main'>




            <Profile />
            {/*
                        <Signup />
            
            */}

          </div>
        </div>
        <Footer />
      </div >
    </ThemeProvider >

  );
}

export default App;
