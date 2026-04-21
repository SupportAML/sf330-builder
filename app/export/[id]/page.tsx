"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/preview/${id}?autoprint=1`);
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Opening PDF export…</p>
    </div>
  );
}
