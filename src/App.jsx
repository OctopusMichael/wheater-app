import { useState } from "react";
import Header from "./components/Header";
import WeatherTable from "./components/WeatherTable";
import SearchBar from "./components/SearchBar";
import WeatherSkeleton from "./components/WeatherSkeleton";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto p-6">
        <header>
          <Header />
        </header>
        <main>
          <SearchBar onSelectedCity={setSelectedCity} />
          {selectedCity && <WeatherTable city={selectedCity} />}
        </main>
      </div>
    </div>
  );
}

export default App;