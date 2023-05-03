import React from 'react';
import { BLUE } from '@/constants';
import styles from './Header.module.css';
import useLineItems from '@/hooks/useLineItem';

const Header = () => {
    const { addLineItem, generateLineItem, currentId } = useLineItems();

    return (
        <header className={styles.header}>
            <h1 style={ { color: BLUE } }>Your Cart</h1>
            <button onClick={ () => addLineItem(generateLineItem(currentId)) }
                    style={ { background: BLUE } }>Add To Cart
            </button>
        </header>
    );
};

export default Header;