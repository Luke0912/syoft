import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [button, setButton] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAuth = (s) => {
    setAuth(s);
  };
  const handleState = (id) => {
    setId(id);
  };
  const handleToken = (token) => {
    setToken(token);
  };
  const handleRender = (button) => {
    setButton(button);
  };
  const handleName = (name) => {
    setName(name);
  };
  const handleRole = (role) => {
    setRole(role);
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        handleAuth,
        id,
        handleState,
        token,
        handleToken,
        button,
        handleRender,
        name,
        handleName,
        role,
        handleRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
