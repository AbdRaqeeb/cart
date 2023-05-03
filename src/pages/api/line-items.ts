import type { NextApiRequest, NextApiResponse } from 'next';
import { LineItem } from '@/types';
import { lineItems } from '@/constants';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        data: LineItem[],
    }>
) {

    res.status(200).json({ data: lineItems })
}

