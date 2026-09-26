// src/app/(i18n)/[lang]/home/page.tsx
import { redirect } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
