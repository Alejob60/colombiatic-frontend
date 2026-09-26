// src/app/(i18n)/[lang]/register/page.tsx
import { redirect } from 'next/navigation';

export default function RegisterRedirect() {
  // Redirigir a la página de registro sin i18n
  redirect('/register');
}