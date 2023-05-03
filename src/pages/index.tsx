import { Container, Header, Products, Fees } from '@/components';
import { HST, lineItems, SHIPPING, SUBTOTAL, TOTAL } from '@/constants';

export default function Home() {
  return (
    <>
      <Container>
          <Header />
          <Products lineItems={lineItems} />
          <Fees subTotal={SUBTOTAL} tax={HST} shipping={SHIPPING} total={TOTAL} />
      </Container>
    </>
  )
}
