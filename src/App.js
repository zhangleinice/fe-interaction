import Waterfall from "./components/waterfall";
import Carousel from "./components/carousel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="carousel-section">
        <Carousel />
      </div>
      <div className="waterfall-section">
        <Waterfall />
      </div>
    </div>
  );
}

export default App;
