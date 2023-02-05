import React from 'react'
import { CgMenu } from 'react-icons/cg';
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import NavLinks from './NavLinks';
import styles from './Header.module.css';

function MobileNavigation() {
    const [open, setOpen] = useState(false);

    const hamburgerIcon = <CgMenu className={styles.hamburger} size='30px'
        onClick={() => setOpen(!open)} />

    const closeIcon = <CgClose className={styles.closeIcon} size='30px'
        onClick={() => setOpen(!open)} />

    const closeMobileMenu = () => {
        setOpen(false);
    }

    return (
        <nav className={styles.mobile__navigation}>
            {open ? closeIcon : hamburgerIcon}
            {open && <NavLinks closeMobileMenu={closeMobileMenu} />}
        </nav>
    );
}

export default MobileNavigation;