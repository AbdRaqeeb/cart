import React, { useContext } from 'react';
import { LineItemContext } from '@/contexts/LineItemContext';

const UseLineItems = () => {
    const context = useContext(LineItemContext);

    if (!context) throw new Error('Line Item context must be use inside LineItemProvider');

    return context;
};

export default UseLineItems;