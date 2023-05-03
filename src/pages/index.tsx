import { Container, Header, Products, Fees } from '@/components';
import { HST, lineItems as items, SHIPPING, SUBTOTAL, TOTAL } from '@/constants';
import useLineItems from '@/hooks/useLineItems';

export default function Home() {

    return (
        <>
            <Container>
                <Header/>
                <Products />
                <Fees />
            </Container>
        </>
    );
}
