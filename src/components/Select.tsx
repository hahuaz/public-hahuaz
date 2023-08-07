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
        className={` relative m-4 w-[110px] justify-center border-b-2 text-gray-600  ${
          isSelectFocused ? "border-blue-500" : "border-gray-400"
        }`}
      >
        <label
          htmlFor="currency-select"
          className={`pointer-events-none absolute left-0 top-0 pt-2 ${
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
          className={`w-full py-2 pl-[70px]  font-semibold  text-black outline-none`}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
