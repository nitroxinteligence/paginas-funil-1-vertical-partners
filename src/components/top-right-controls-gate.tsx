"use client";

import { usePathname } from "next/navigation";
import { TopRightControls } from "@/components/top-right-controls";

export function TopRightControlsGate() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/lp-funil")) {
    return null;
  }

  return <TopRightControls />;
}

