import React, { useState } from "react";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export default function CurrencySelect(
  { isDisabled }: { isDisabled: boolean } = { isDisabled: false },
) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].value);
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="bg-white p-32">
      <div
        className={`m-4 flex w-[25ch] flex-col justify-center  text-gray-600`}
      >
        <label
          htmlFor="currency-select"
          className={`pointer-events-none text-sm ${
            isSelectFocused && "  text-blue-500 "
          }`}
        >
          Currency:
        </label>
        <select
          id="currency-select"
          value={selectedCurrency}
          onFocus={() => setIsSelectFocused(true)}
          onBlur={() => setIsSelectFocused(false)}
          onChange={handleSelectChange}
          disabled={isDisabled}
          style={{
            transitionDuration: "900ms",
            transformOrigin: "mid",
          }}
          className={` border-b-2 font-semibold outline-none ${
            isSelectFocused ? "border-blue-500" : "border-gray-400"
          }`}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400">Please select your currency</p>
      </div>
    </div>
  );
}
