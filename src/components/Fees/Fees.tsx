import React from 'react';
import styles from './Fees.module.css';
import { BLUE } from '@/constants';
import { roundNumber } from '@/utils';

type FeesProp = {
    subTotal: number;
    tax: number;
    shipping: string;
    total: number;
}

const Fees = ({ shipping, tax, total, subTotal }: FeesProp) => {
    return (
        <div className={ styles.fees }>
            <div className={ styles.fees__detail }>
                <span>Subtotal</span>
                <span>${ roundNumber(subTotal) }</span>
            </div>
            <div className={ styles.fees__detail }>
                <span>Taxes(estimated)</span>
                <span>${ roundNumber(tax) }</span>
            </div>
            <div className={ styles.fees__detail }>
                <span>Shipping</span>
                <span>{shipping}</span>
            </div>
            <div style={ { color: BLUE } } className={ `${styles.total} ${styles.fees__detail}` }>
                <span>Total</span>
                <span>${ roundNumber(total) }</span>
            </div>
        </div>
    );
};

export default Fees;