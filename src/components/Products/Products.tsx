import React from 'react';
import styles from './Products.module.css';
import { LineItem } from '@/types';
import { Product } from '@/components/Product';

type ProductsProp = {
    lineItems: LineItem[];
}

const Products = ({ lineItems }: ProductsProp) => {
    return (
        <div className={ styles.container }>
            <div className={ styles.products }>
                { lineItems.map(lineItem => (
                    <Product key={lineItem.id} lineItem={lineItem} />
                )) }
            </div>
        </div>
    );
};

export default Products;