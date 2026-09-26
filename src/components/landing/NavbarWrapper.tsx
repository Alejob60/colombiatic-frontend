'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';

const NavbarWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Siempre renderizar el Navbar, pero solo mostrar ciertos elementos en el cliente
  return (
    <div className="w-full">
      <Navbar isClient={isClient} />
    </div>
  );
};

export default NavbarWrapper;