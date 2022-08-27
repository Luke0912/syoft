import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/Authcontext';
import Button from '@mui/material/Button';
import UserProduct from '../../components/UserProduct/UserProduct';
import axios from 'axios';
import configuration from '../../config';
import { orange } from '@mui/material/colors';
import styles from './homepage.module.css';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export const Home = () => {
  const { name, role, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [item, setItem] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/Addproducts');
  };

  const handleView = () => {
    axios
      .get(configuration.BASE_URL.concat('/getproduct'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setItem(data.data);
      });
    // handleRender(false);
  };
  return (
    <>
      <h3>Name:{name}</h3>
      <h3>Role:{role}</h3> <br />
      <p>Staff cannot add view or edit</p>
      <p>Admin can add,view and edit inventory_count</p>
      <p>Admin can view and edit inventory_count</p>
      <div className={styles.main}>
        <div className={styles.add}>
          <ThemeProvider theme={theme}>
            {role === 'staff' || role === 'manager' ? (
              <Button variant='contained' onClick={handleAdd} disabled>
                Add Product
              </Button>
            ) : (
              <Button variant='contained' onClick={handleAdd}>
                Add Product
              </Button>
            )}
          </ThemeProvider>
        </div>
        <div className={styles.viewall}>
          <ThemeProvider theme={theme}>
            {role === 'staff' ? (
              <Button variant='contained' onClick={handleView} disabled>
                View All Product
              </Button>
            ) : (
              <Button variant='contained' onClick={handleView}>
                View All Product
              </Button>
            )}
          </ThemeProvider>
        </div>
      </div>
      <div className={styles.list}>
        {item.map((e) => (
          <div key={e._id} className={styles.listitems}>
            <UserProduct product={e} />
          </div>
        ))}
      </div>
    </>
  );
};
