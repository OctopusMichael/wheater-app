import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherTable from "./components/WeatherTable";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto p-6">
        <header>
          <Header />
        </header>
        <main>
          <SearchBar />
          <WeatherTable />
          
        </main>
      </div>
    </div>
  );
}

export default App;
