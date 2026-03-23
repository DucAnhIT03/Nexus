'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Profile } from '../../src/views/Profile';

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || undefined;

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return (
    <Profile
      onNavigate={handleNavigate}
      defaultTab={tab as any}
    />
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
