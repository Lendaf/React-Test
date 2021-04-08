import './App.css';
import Pie from './component/Pie';
import data from "./data/test.json"

const App = () => {
  return (
    <div className="App">
      <p className="Title">{data.firstLayer.Title}</p>
      <Pie />
    </div>
  );
}

export default App;
