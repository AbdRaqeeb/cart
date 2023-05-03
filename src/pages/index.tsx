import { Container, Header, Products, Fees, Spinner } from '@/components';
import useLineItems from '@/hooks/useLineItem';

export default function Home() {
    const { loading } = useLineItems();
    return (
        <>
            <Container>
                <Header/>
                {loading ? <Spinner /> : (
                    <>
                        <Products />
                        <Fees />
                    </>
                )}
            </Container>
        </>
    );
}
