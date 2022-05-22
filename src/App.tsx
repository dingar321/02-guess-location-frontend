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


function App() {

  return (
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <Routes>


          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />

          {/* Private routes */}


          {/* Catch all routes */}


        </Routes>
      </ThemeProvider >
    </Router>
  );
}

export default App;
