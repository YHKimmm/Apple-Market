import React from "react";
import Navigation from "./Navigation";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";


const imageFolderPath = import.meta.env.BASE_URL + "";

function Header() {

  return (
    <header className={styles.navbar}>
      <h1 className={styles.title}>
        <NavLink to='/'>
          <img src={`${imageFolderPath}logo.jpg`} alt='logo' className={styles.logo} />
        </NavLink>
        <NavLink to='/'>AppleMarket</NavLink>
      </h1>
      <MobileNavigation style={{ 'padding': '20px' }} />
      <Navigation />
    </header>
  );
}

export default Header;
