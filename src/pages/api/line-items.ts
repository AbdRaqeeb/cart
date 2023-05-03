import type { NextApiRequest, NextApiResponse } from 'next';;
import { DeliveryDate, LineItem } from '@/types';
import { DELIVERY_DATES, lineItems } from '@/constants';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        data: LineItem[],
    }>
) {
    const { postalCode } = req.query;

    const data = handleDeliveryDates(lineItems, DELIVERY_DATES, String(postalCode));

    res.status(200).json({ data })
}

const handleDeliveryDates = (items: LineItem[], dates: DeliveryDate[], postalCode: string): LineItem[] => {
    const availablePostalCode = dates.map((date) => date.postal.toLowerCase());

    const firstLetter = postalCode.charAt(0).toLowerCase();

    let estimatedDeliveryDate: DeliveryDate;

    return items.map((item) => {
        if (availablePostalCode.includes(firstLetter)) {
            estimatedDeliveryDate = dates.find(
                (date) => date.postal.toLowerCase() === firstLetter && date.ids.includes(item.id)
            )!;
        } else {
            estimatedDeliveryDate = dates.find(
                (date) => date.ids.includes(item.id)
            )!;
        }

        return {
            ...item,
            estimatedDeliveryDate: estimatedDeliveryDate?.estimatedDeliveryDate || '',
        }
    });
}
