import React, { useState } from "react";

export default function Input(
  { isDisabled }: { isDisabled: boolean } = { isDisabled: false }
) {
  const [nameInput, setNameInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isContainingTwoWords, setIsContainingTwoWords] = useState(true);
  const [isWordLengthValid, setIsWordLengthValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNameInput(inputValue);

    const words = inputValue.trim().split(/\s+/);
    setIsContainingTwoWords(words.length >= 2);
    setIsWordLengthValid(words.every((word) => word.length >= 2));
  };

  return (
    <div className="bg-white p-32">
      <div className="relative m-4 w-[25ch] text-gray-600">
        <label
          htmlFor="standart-input"
          className={`pointer-events-none absolute left-0 top-0  origisn-top-left transition-all ${
            (nameInput || isInputFocused) &&
            "-translate-y-5 text-xs text-blue-500 "
          }`}
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name-input"
          value={nameInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={handleInputChange}
          disabled={isDisabled}
          className={`border-0 border-b outline-none ${
            (nameInput || isInputFocused) && "border-b-2 border-blue-500"
          }`}
        />

        {!isContainingTwoWords && (
          <p className="mt-1 text-xs text-red-500">
            - Please enter at least two words.
          </p>
        )}
        {!isWordLengthValid && (
          <p className="mt-1 text-xs text-red-500">
            - Please enter at least two characters for each word.
          </p>
        )}
      </div>
    </div>
  );
}
