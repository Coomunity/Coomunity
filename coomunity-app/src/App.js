import React from 'react';
import './App.css';
import Navigation_1 from './pages/navigation-bar/prev_nav';
import Navigation_2 from './pages/navigation-bar/login_nav';
import Login from './pages/Login';
import Signup from './pages/signUp/signUp';

function App() {
  return (
    <div className='App'>
      {/* <div className='none'>
        <Navigation_1 />
      </div> */}
      <div className=''>
        <Navigation_2 />
      </div>      
      {/* <div className=''>
        <Login />
      </div> */}
      {/* <div className=''>
        <Signup />
      </div> */}
    </div>
  );
}

export default App;