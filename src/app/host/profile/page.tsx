
import { Suspense } from 'react';
import HostProfileClientPage from './client-page';

export default function HostProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HostProfileClientPage />
    </Suspense>
  );
}
