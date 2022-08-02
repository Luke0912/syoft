import './App.css';

import { Route, Routes } from 'react-router';

import { Form } from './pages/formhandler/form';
import { Home } from './pages/homepagehandler/homepage';
import { Login } from './pages/signinhandler/login';
import { Navbar } from './components/navbarhandler/navbar';
import { ProtectedRoute } from './pages/privateroutes';
import { Signup } from './pages/signuphandler/signup';

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route
          path='/Home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route
          path='/Addproducts'
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
