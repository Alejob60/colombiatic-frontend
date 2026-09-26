'use client';

import React from 'react';

export default function SimpleNavbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 99999 }} className="bg-red-500 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">SIMPLE NAVBAR - SI ME VES, EL NAVBAR FUNCIONA</h1>
      </div>
    </nav>
  );
}