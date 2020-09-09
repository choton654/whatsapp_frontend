import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='login'>
      <div className='login_container'>
        <img src='https://i.gadgets360cdn.com/large/whatsapp_1569662156405.jpg' />
        <div className='login_text'>
          <h1>SignIn to WhatsAapp</h1>
        </div>
        <Button onClick={signIn}>SignIn with Google</Button>
      </div>
    </div>
  );
};

export default Login;
