import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <RecoilRoot>
    <App />
  </RecoilRoot>

);


//ReactDOM.render(<App />, document.getElementById('root'));

//Removed strict mode for testing
//If anything goes wrong add it back
/* 

<React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
</React.StrictMode>

*/