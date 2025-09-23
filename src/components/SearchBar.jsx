import { useState } from "react";

const SearchBar = ({ onSelectedCity }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1`
      );
      const data = await res.json();

      if (data && data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0];
        onSelectedCity({ latitude, longitude, name, country });
      } else {
        setError("City not found.");
      }
    } catch (err) {
      setError("Error fetching location.");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center mt-6 ">
      <form
        className="w-[40%] max-w-3xl bg-white/30 backdrop-blur-md rounded-[32px] h-[64px] flex items-center justify-center px-6 gap-4"
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <div className="relative w-3/4">
          <img
            src="/images/icon-search.svg"
            alt="icon-search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          />
          <input
            placeholder="Search for a place"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-neutral-800 text-neutral-0 placeholder-neutral-300 pl-10 pr-4 py-2 rounded-[8px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-[8px] bg-blue-500 text-black px-4 py-2 hover:bg-red-400 flex gap-2 items-center text-neutral-0 text-bold"
        >
          Search
        </button>

        {error && <p className="ml-4 text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default SearchBar;
