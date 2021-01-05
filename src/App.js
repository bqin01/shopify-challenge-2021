import logo from './logo.svg';
import InteractiveCard from "./components/InteractiveCard.js";
import SearchBox from "./components/MovieSearch.js";
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="App-header">
        Lorem Ipsum
      </h1>
      <p>Some more lorem ipsum</p>
      <SearchBox />
    </div>
  );
}

export default App;
