import Button from '@mui/material/Button';
import axios from 'axios';
import configuration from '../../config';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Signup = () => {
  const navigate = useNavigate();
  const payload = {
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': 'application/json' };
    try {
      const resp = await axios.post(
        configuration.BASE_URL.concat('/register'),
        details,
        {
          headers: headers,
        }
      );
      console.log(resp);
      navigate('/Login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGo = (e) => {
    e.preventDefault();
    navigate('/Login');
  };
  return (
    <>
      <div className={styles.form}>
        <h3>Sign Up</h3>
        <input
          type='text'
          placeholder='username'
          name='username'
          onChange={handleInput}
        />
        <input
          type='text'
          placeholder='email'
          name='email'
          onChange={handleInput}
        />
        <input
          type='phone'
          placeholder='phone'
          name='phone'
          onChange={handleInput}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          onChange={handleInput}
        />
        <input
          type='text'
          placeholder='role(admin,manager,staff)'
          name='role'
          onChange={handleInput}
        />
        <Button variant='outlined' onClick={handleRegister}>
          Signup
        </Button>
        <h3>Already Have a Account?</h3>
        <Button onClick={handleGo}>Go to Login Page</Button>
      </div>
    </>
  );
};
