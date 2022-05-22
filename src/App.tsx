import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import User from './utils/types/User';
import { UserState } from './utils/common/UserRecoil';
import { useRecoilState } from 'recoil'
import { Storage } from 'aws-amplify';

//Themes
import DefaultTheme from './utils/styles/default-theme';
import './utils/styles/App.css';

//Pages
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import axios from 'axios';
import LocationAdd from './pages/LocationAdd';


function App() {

  //Getting and saving the user to a global state
  const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

  useEffect(() => {
    //Get the user
    const fetchLoggedUser = async () => {
      await axios(
        {
          method: 'POST',
          url: 'http://localhost:3333/auth/user',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      ).then(response => {
        setLoggedUser(response.data);
      }).catch(error => {
        console.log('Signup error: ', error)
      });
    }
    fetchLoggedUser();
  }, [])

  return (
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <Routes>


          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />

          {/* Private routes */}
          <Route path="/add-location" element={<LocationAdd />} />

          {/* Catch all routes */}


        </Routes>
      </ThemeProvider >
    </Router>
  );
}

export default App;
