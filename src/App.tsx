import { ThemeProvider } from '@emotion/react';

//Themes
import DefaultTheme from './common/styles/default-theme';

//Components 
import Header from './components/navbar/Header';

function App() {

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className='app'>
        <Header />
        <div>

        </div>
      </div>
    </ThemeProvider>

  );
}

export default App;
