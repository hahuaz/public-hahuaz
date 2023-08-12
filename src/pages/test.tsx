"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import AnimateDrawer from "@/components/AnimatedDrawer";

export default function Test() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <>
      <AnimateDrawer></AnimateDrawer>
      <div className="min-h-[1500px] bg-red-400"></div>
      <div className="min-h-[1500px] bg-green-400"></div>
      <div className="min-h-[1500px] bg-blue-400"></div>
    </>
  );
}
