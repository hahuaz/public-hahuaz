import React, { useState } from "react";

export default function Input() {
  const [nameInput, setNameInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="bg-white p-32">
      <div className="relative m-4 w-[25ch] text-gray-600">
        <label
          htmlFor="standart-input"
          className={`absolute left-0 top-0 origin-top-left  transition-all ${
            (nameInput || isInputFocused) &&
            "-translate-y-5 text-xs text-blue-500 "
          }`}
        >
          Name
        </label>
        <input
          type="text"
          id="name-input"
          value={nameInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) => setNameInput(e.target.value)}
          className={`border-0 border-b outline-none ${
            (nameInput || isInputFocused) && "border-b-2 border-blue-500"
          }`}
        />
      </div>
    </div>
  );
}
