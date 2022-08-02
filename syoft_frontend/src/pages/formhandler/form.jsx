import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/Authcontext';
import { Button } from '@mui/material';
import axios from 'axios';
import configuration from '../../config';
import styles from './form.module.css';

export const Form = () => {
  const { id, token } = useContext(AuthContext);

  // const [userId, setUserId] = useState(id);
  const payload = {
    name: '',
    price: '',
    description: '',
    inventory_count: '',
  };

  const [details, setDetails] = useState({
    userId: id,
    payload,
  });

  const handleInput = (e) => {
    const val = e.target.value;
    setDetails({
      ...details,
      [e.target.name]: val,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.post(
        configuration.BASE_URL.concat('/createproduct'),
        details,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (resp.status !== 200) {
        throw new Error('Unable to submit');
      } else {
        alert('Product Successfully created');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className={styles.form}>
        <input
          type='text'
          name='name'
          placeholder='Product Name'
          onChange={handleInput}
        />
        <input
          type='text'
          name='price'
          placeholder='Price'
          onChange={handleInput}
        />
        <input
          type='text'
          name='description'
          placeholder='Description'
          onChange={handleInput}
        />
        <input
          type='number'
          name='inventory_count'
          placeholder='Inventory_count'
          onChange={handleInput}
        />
        <Button variant='outlined' onClick={handleSubmit}>
          Add Product
        </Button>
      </div>
    </>
  );
};
