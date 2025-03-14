import React, { useEffect, useState } from "react";

// create loop
const top20Movies = Array.from({ length: 20 }, (_, i) => ({
  label: `Movie ${i + 1}`,
  year: 2000 + i,
}));

interface IMovie {
  label: string;
  year: number;
}

export default function Autocomplete(
  { isDisabled }: { isDisabled: boolean } = { isDisabled: false }
) {
  const [nameInput, setNameInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [movieData, setMovieData] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNameInput(inputValue);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setNameInput(option);
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setMovieData(top20Movies);
    setIsLoading(false);
  };

  // search when input focused first time
  useEffect(() => {
    if (!isInputFocused || movieData.length) return;
    fetchMovies();
    return () => {};
  }, [isInputFocused]);

  return (
    <div className="bg-white p-32">
      <div className="relative m-4 w-[25ch] text-gray-600">
        <label
          htmlFor="standart-input"
          className={`pointer-events-none absolute left-0 top-0  origin-top-left transition-all ${
            (nameInput || isInputFocused) &&
            "-translate-y-5 text-xs text-blue-500 "
          }`}
        >
          Search Movie
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
        {isInputFocused && (
          <div className="absolute left-0 right-0 top-full mt-1 max-h-[250px] overflow-y-scroll rounded-md bg-white p-2 shadow-md">
            {isLoading ? ( // Check if loading
              <div>Loading...</div>
            ) : movieData.length ? (
              movieData.map((film, index) => (
                <div
                  key={index}
                  className={`cursor-pointer py-1 hover:bg-gray-100 ${
                    selectedOption === film.label ? "bg-gray-100" : ""
                  }`}
                  onMouseDown={() => handleOptionSelect(film.label)}
                >
                  {film.label}
                </div>
              ))
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
