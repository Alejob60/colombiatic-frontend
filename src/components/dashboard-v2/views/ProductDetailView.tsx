// src/components/dashboard-v2/views/ProductDetailView.tsx
"use client";

export default function ProductDetailView({ data }: { data: Record<string, any> }) {
  return <div className="p-8"><h1 className="text-2xl font-bold text-white">Product Detail - {data.productId}</h1></div>;
}
