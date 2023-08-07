"use client";
import React, { useState } from "react";

import { ButtonWithLoading } from "@/components";

export default function Test() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-white p-24 text-black">
      <ButtonWithLoading
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
        }}
      >
        clicke me!
      </ButtonWithLoading>
    </div>
  );
}
