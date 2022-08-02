import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/Authcontext';
import Button from '@mui/material/Button';
import axios from 'axios';
import configuration from '../../config';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { handleAuth, handleState, handleToken, handleRole, handleName } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const payload = {
    email: '',
    password: '',
  };

  const [details, setDetails] = useState({
    payload,
  });

  const handleInput = (e) => {
    const val = e.target.value;
    setDetails({
      ...details,
      [e.target.name]: val,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.post(
        configuration.BASE_URL.concat('/login'),
        details
      );
      const id = resp.data.user._id;
      const token = resp.data.token;
      const name = resp.data.user.username;
      const role = resp.data.user.role[0];
      if (resp.status !== 201) {
        throw new Error('Unable to login');
      }
      handleAuth(true);
      handleState(id);
      handleToken(token);
      handleName(name);
      handleRole(role);
      navigate('/Home');
    } catch (error) {
      alert(error.message);
    }
  };
  const submitHandler2 = (e) => {
    e.preventDefault();
    navigate('/Signup');
  };

  return (
    <>
      <div className={styles.form}>
        <h3>Login</h3>
        <input
          type='text'
          placeholder='enter email'
          name='email'
          onChange={handleInput}
        />
        <input
          type='password'
          placeholder='enter password'
          name='password'
          onChange={handleInput}
        />
        <Button variant='contained' onClick={submitHandler}>
          Login
        </Button>
        <h4>Did not have account?</h4>
        <Button variant='contained' onClick={submitHandler2}>
          Signup
        </Button>
      </div>
    </>
  );
};
