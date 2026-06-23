"use client";

import { useEffect } from "react";

// Mounts the real yawp overlay toolbar inline, into #yawp-slot.
export default function YawpBar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __YAWP_LOADED__?: boolean }).__YAWP_LOADED__) return;
    (window as unknown as { __YAWP_MOUNT__?: string }).__YAWP_MOUNT__ = "#yawp-slot";
    const s = document.createElement("script");
    s.src = "/overlay/inject.js?v=" + Date.now(); // always fetch the latest build in dev
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      id="yawp-slot"
      style={{ marginTop: 40, width: "100%", display: "flex", justifyContent: "center" }}
    />
  );
}
