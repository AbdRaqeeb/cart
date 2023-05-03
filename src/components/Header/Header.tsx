import React from 'react';
import { BLUE } from '@/constants';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 style={ { color: BLUE } }>Your Cart</h1>
        </header>
    );
};

export default Header;