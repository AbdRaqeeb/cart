import { Container, Header, Products } from '@/components';
import { lineItems } from '@/constants';

export default function Home() {
  return (
    <>
      <Container>
          <Header />
          <Products lineItems={lineItems} />
      </Container>
    </>
  )
}
