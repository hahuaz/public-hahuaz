"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { AnimatedSelect } from "@/components";

export default function Test() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div className="relative min-h-screen bg-white text-black">
      <AnimatedSelect></AnimatedSelect>
    </div>
  );
}
