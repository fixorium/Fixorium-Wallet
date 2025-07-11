import React from 'react';
import { GoogleLogin as GoogleLoginButton } from 'react-google-login';

const clientId = 'YOUR_CLIENT_ID';

const GoogleLogin = () => {
  const onSuccess = (response) => {
    console.log(response);
    // Handle successful login
  };

  const onFailure = (response) => {
    console.log(response);
    // Handle failed login
  };

  return (
    <GoogleLoginButton
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLogin;
