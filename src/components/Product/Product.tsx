import React from 'react';
import styles from './Product.module.css';
import { LineItem } from '@/types';
import { BLACK, BLUE, ESTIMATED_DELIVERY, LIGHT_GREY } from '@/constants';

type ProductProp = {
    lineItem: LineItem;
};

const Product = ({ lineItem }: ProductProp) => {
    return (
        <div className={ styles.product }>
            <div className={ styles.product__image }>
                <img src={ lineItem.image } alt="product logo"/>
            </div>
            <div className={ styles.product__info }>
                <h3 style={ { color: BLUE } } className={ styles.product__title }>
                    { lineItem.swatchTitle.toUpperCase() } / { lineItem.title } / { lineItem.quantity }
                </h3>
                <div className={ styles.product__color__container }>
                    <div style={ { background: lineItem.swatchColor } }
                         className={ styles.product__color }></div>
                    <span style={ { color: LIGHT_GREY } }>{ lineItem.swatchTitle }</span>
                </div>
            </div>
            <div style={ { color: BLACK } } className={ styles.product__pricing }>
                <span>${ lineItem.price }</span>
                <div className={ styles.product__pricing__bottom }>
                    <span>Estimated Delivery Date: {ESTIMATED_DELIVERY}</span>
                    <span className={ styles.remove }>Remove</span>
                </div>
            </div>
        </div>
    );
};

export default Product;