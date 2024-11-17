import "./App.css";
import SearchInput from "./components/sidebar/SearchInput";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="p-5 h-screen sm:h-screen flex  sm:items-center sm:justify-center text-white font-bold">
      <Home />
    </div>
  );
}

export default App;
