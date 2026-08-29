"use client";

import { useEffect } from "react";
import { preloader } from "@/lib/preloader";

export default function Preloader() {
  useEffect(() => {
    preloader.finish();
  }, []);

  return null;
}
