import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/Authcontext';
import Button from '@mui/material/Button';
import axios from 'axios';
import configuration from '../../config';
import { orange } from '@mui/material/colors';
import styles from './homepage.module.css';
import { useNavigate } from 'react-router-dom';

// import UserRecipes from "../../components/UserRecipes/UserRecipes";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export const Home = () => {
  const { id, button, handleRender, name, role, token } =
    useContext(AuthContext);
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

  // const handleViewUser = () => {
  //   axios.get(configuration.BASE_URL.concat(`/product/${id}`)).then((data) => {
  //     setItem(data.data);
  //   });
  //   handleRender(true);
  // };
  return (
    <>
      <h3>Name:{name}</h3>
      <h3>Role:{role}</h3> <br />
      <div className={styles.main}>
        <div className={styles.add}>
          <ThemeProvider theme={theme}>
            {role === 'staff' ? (
              <Button variant='contained' onClick={handleAdd} disabled>
                Add Product
              </Button>
            ) : (
              <Button variant='contained' onClick={handleAdd} disabled>
                Add Product
              </Button>
            )}
          </ThemeProvider>
        </div>
        <div className={styles.viewall}>
          {role === 'staff' ? (
            <Button variant='contained' onClick={handleView} disabled>
              View All Product
            </Button>
          ) : (
            <Button variant='contained' onClick={handleView} disabled>
              View All Product
            </Button>
          )}
        </div>
        {/* <div className={styles.view}>
          <ThemeProvider theme={theme}>
            <Button variant='contained' onClick={handleViewUser}>
              View Your Recipes
            </Button>
          </ThemeProvider>
        </div> */}
      </div>
      <div className={styles.list}>
        {item.map((e) => (
          <div key={e._id} className={styles.listitems}>
            {!button && (
              <>
                <h4>Dish Name:{e.name}</h4>
                <p>Price:{e.price}</p>
                <p>Description:{e.description}</p>
                <p>Inventory_count:{e.inventory_count}</p>
              </>
            )}
            {/* {button && <UserRecipes recipe={e} />} */}
          </div>
        ))}
      </div>
    </>
  );
};
