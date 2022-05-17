import { ThemeProvider } from '@emotion/react';

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
import Home from './components/home/Home';
import LocationAdd from './components/locations/LocationAdd';
import GuessAdd from './components/guess/GuessAdd';

function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="app" >
        <div>
          <Header />
          <div className='main'>

            <LocationAdd />
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
