import HomeContainer from '@/components/HomeContainer';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function Home() {
  return <HomeContainer />;
}
