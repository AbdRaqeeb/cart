import React, { createContext, useEffect, useRef, useState } from 'react';
import { LineItem } from '@/types';
import { getRandomInt, roundNumber } from '@/utils';
import { ESTIMATED_DELIVERY, lineItems as items } from '@/constants';

type LineItemContextType = {
    postalCode: string;
    loading: boolean;
    currentId: number;
    lineItems: LineItem[],
    total: number;
    subTotal: number;
    tax: number;
    shipping: number;
    removeLineItem: (lineItemId: number) => void;
    addLineItem: (lineItemId: LineItem) => void;
    generateLineItem: (id: number) => LineItem;
    setPostalCode: (postalCode: string) => void;
    fetchLineItems: (postalCode?: string) => void;
}

export const LineItemContext = createContext<LineItemContextType>({
    postalCode: '',
    loading: false,
    currentId: 0,
    lineItems: [],
    total: 0,
    subTotal: 0,
    tax: 0,
    shipping: 0,
    removeLineItem: (lineItemId: number) => {},
    addLineItem: (lineItemId: LineItem) => {},
    generateLineItem: (id: number) => items[0],
    setPostalCode: (postalCode: string) => {},
    fetchLineItems: (postalCode?: string) => {},
});

type LineItemProviderProps = {
    children: React.ReactNode;
}

const LineItemProvider = ({ children }: LineItemProviderProps) => {
    const calculateFees = useRef((lineItems: LineItem[]) => {});

    const [loading, setLoading] = useState<boolean>(false);
    const [lineItems, setLineItems] = useState<LineItem[]>([]);
    const [currentId, setCurrentId] = useState<number>(3);
    const [values, setValues] = useState({
        subTotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
    });
    const [postalCode, setPostalCode] = useState<string>('');

    const fetchLineItems = async (postalCode?: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/line-items?postalCode=${postalCode}`);
            const response = await res.json();

            setLineItems(response.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLineItems();

    }, []);


    const removeLineItem = (lineItemId: number) => {
        setLineItems((prevState) => prevState.filter(
            (item) => item.id !== lineItemId)
        )
    };

    const addLineItem = (lineItem: LineItem) => {
        setLineItems((prevState) => [...prevState, lineItem]);
        setCurrentId(lineItem.id);
    };

    const generateLineItem = (id: number): LineItem => {
        const item = items[getRandomInt(0, 2)];
        return {
            ...item,
            id: id + 1,
            estimatedDeliveryDate: ESTIMATED_DELIVERY,
        }
    };

    useEffect(() => {
        calculateFees.current = (lineItems: LineItem[]) => {
            const _shipping = lineItems.length ? 15 : 0;

            let _subTotal = lineItems.reduce((acc: number, lineItem: LineItem) => acc + (lineItem.price * lineItem.quantity), 0);
            _subTotal = roundNumber(_subTotal);

            const _tax = roundNumber(_subTotal * 0.13);

            const _total = roundNumber(_subTotal + _tax + _shipping);

            setValues(prevState => ({
                ...prevState,
                shipping: _shipping,
                subTotal: _subTotal,
                tax: _tax,
                total: _total,
            }));
        };

        calculateFees.current(lineItems);

    }, [lineItems]);

    const { subTotal, tax, shipping, total } = values;

    return (
        <LineItemContext.Provider
            value={{
                postalCode,
                loading,
                shipping,
                tax,
                total,
                subTotal,
                currentId,
                lineItems,
                removeLineItem,
                addLineItem,
                generateLineItem,
                setPostalCode,
                fetchLineItems,
            }}
        >
            {children}
        </LineItemContext.Provider>
    )
};

export default LineItemProvider;
