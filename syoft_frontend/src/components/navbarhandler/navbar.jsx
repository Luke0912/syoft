import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/Authcontext";
import styles from "./navbar.module.css";
import { useContext } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { auth, handleAuth } = useContext(AuthContext);
  const logoutHandler = () => {
    handleAuth(false);
    navigate("/");
    return;
  };
  return (
    <>
      <div className={styles.navbaroutline}>
        <div className={styles.title}>
          {auth && <Link to={"/Home"}>Home</Link>}
          {auth && (
            <Link to={"/Login"} onClick={logoutHandler}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};