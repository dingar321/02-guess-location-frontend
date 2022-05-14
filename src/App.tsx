import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';

//Themes
import DefaultTheme from './common/styles/default-theme';
import './common/styles/App.css';

//Components 
import Header from './components/navbar/Header';
import Footer from './components/footer/Footer';
import Test from './components/test';


function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="app" >
        <div>
          <Header />
          <div className='main'>
            <Container maxWidth="xl">

              {/* Main  */}



            </Container>
          </div>
        </div>
        <Footer />
      </div >
    </ThemeProvider>

  );
}

export default App;
