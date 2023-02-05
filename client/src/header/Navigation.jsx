import React from "react";
import NavLinks from "./NavLinks";
import styles from "./Header.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLinks />
    </nav>
  );
}

export default Navigation;
