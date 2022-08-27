import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/Authcontext';
import Button from '@mui/material/Button';
import axios from 'axios';
import configuration from '../../config';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

const UserProduct = ({ product }) => {
  const { token } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);

  const [editableValues, setEditableValues] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    inventory_count: product.inventory_count,
  });

  const handleUserEdit = () => {
    setEditable((curr) => !curr);
  };

  const handleEditing = (e) => {
    const values = { ...editableValues };
    const nValues = { ...values, [e.target.name]: e.target.value };
    setEditableValues(nValues);
  };

  const onConfirm = async () => {
    const { _id, userId } = product;
    const payload = {
      userId: userId,
      name: editableValues.name,
      price: editableValues.price,
      description: editableValues.description,
      inventory_count: editableValues.inventory_count,
    };
    const resp = await axios.patch(
      configuration.BASE_URL.concat(`/product/${_id}`),
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditableValues(resp.data);
    setEditable(false);
  };

  return (
    <>
      {!editable && <p>Name:{editableValues.name}</p>}
      {!editable && <p>Price:{editableValues.price}</p>}
      {!editable && <p>Description:{editableValues.description}</p>}
      {!editable && <p>Inventory_count:{editableValues.inventory_count}</p>}
      {editable && (
        <>
          <label for='count'>Inventory_count</label>
          <br />
          <input
            type='number'
            id='count'
            placeholder='Inventory_count'
            value={editableValues.inventory_count}
            name='inventory_count'
            onChange={handleEditing}
          />
          <br />
        </>
      )}

      {!editable && (
        <ThemeProvider theme={theme}>
          <Button variant='contained' onClick={handleUserEdit}>
            Update Inventory Count
          </Button>
        </ThemeProvider>
      )}
      {editable && (
        <ThemeProvider theme={theme}>
          <Button variant='contained' onClick={onConfirm}>
            Confirm Changes
          </Button>
        </ThemeProvider>
      )}
      {editable && (
        <ThemeProvider theme={theme}>
          <Button variant='contained' onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </ThemeProvider>
      )}
    </>
  );
};
export default UserProduct;
