 import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wallet from '../components/Wallet';
import GoogleLogin from '../components/GoogleLogin';

const App = () => {
  return (
    <div>
      <Header />
      <GoogleLogin />
      <Wallet />
      <Footer />
    </div>
  );
};

export default App;
