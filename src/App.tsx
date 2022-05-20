import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

//Themes
import DefaultTheme from './utils/styles/default-theme';
import './utils/styles/App.css';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignupForm from './components/forms/SignupForm';

//Pages 


function App() {

  useEffect(() => {

  })

  return (
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <Routes>

          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </ThemeProvider >
    </Router>
  );
}

export default App;
