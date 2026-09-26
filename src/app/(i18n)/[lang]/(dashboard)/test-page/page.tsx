// src/app/(i18n)/[lang]/(dashboard)/test-page/page.tsx
"use client";

import { withAuth } from '@/components/hoc/withAuth';

function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Dashboard Test Page</h1>
      <p className="text-gray-300">This is a test page to verify dashboard routing works correctly.</p>
    </div>
  );
}

export default withAuth(TestPage);