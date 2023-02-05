import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavLinks({ closeMobileMenu }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logOutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <ul>
      <li onClick={closeMobileMenu}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li onClick={closeMobileMenu}>
        <NavLink to="/items">Items</NavLink>
      </li>
      <li onClick={closeMobileMenu}>
        <NavLink to="/upload">Upload</NavLink>
      </li>
      {user.accessToken ? (
        <>
          <li onClick={closeMobileMenu}>
            <NavLink onClick={logOutHandler}>Logout</NavLink>
          </li>
          <li onClick={closeMobileMenu}>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      ) : (
        <>
          <li onClick={closeMobileMenu}>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavLinks;
