"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function System() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/system");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return <>Index is not ready, will redirect after 2s....</>;
}
