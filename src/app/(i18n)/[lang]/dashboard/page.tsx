// src/app/(i18n)/[lang]/dashboard/page.tsx
import { redirect } from "next/navigation";

export default function DashboardRedirect() {
  redirect("/dashboard");
}
