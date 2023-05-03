import React from 'react';
import styles from './Container.module.css';

type ContainerProps = {
    children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    );
};

export default Container;