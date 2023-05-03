import React, { createContext, useEffect, useRef, useState } from 'react';
import { LineItem } from '@/types';
import { lineItems as items } from '@/constants';
import { roundNumber } from '@/utils';

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

export const LineItemContext = createContext<LineItemContextType | null>(null);

type LineItemProviderProps = {
    children: React.ReactNode;
}

const LineItemProvider = ({ children }: LineItemProviderProps) => {
    const calculateFees = useRef((lineItems: LineItem[]) => {});

    const [loading, setLoading] = useState<boolean>(false);
    const [lineItems, setLineItems] = useState<LineItem[]>(items);
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
        return {
            id: id + 1,
            title: "Grey Sofa",
            price: 499.99,
            quantity: 1,
            image:
                "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
            swatchColor: "#959392",
            swatchTitle: "Grey"
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
