import { getAuthSession } from '@/lib/auth';

export default async function Dashboard() {
  const session = await getAuthSession();

  return <h1>Welcome {session?.user.givenName}</h1>;
}
