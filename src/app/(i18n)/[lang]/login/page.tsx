// src/app/(i18n)/[lang]/login/page.tsx
import { redirect } from 'next/navigation';

export default function LoginRedirect() {
  // Redirigir a la página de login sin i18n
  redirect('/login');
}