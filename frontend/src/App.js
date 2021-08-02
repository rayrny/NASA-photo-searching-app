import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './components/SearchBox.js';
import Header from './components/Header.js';

function App() {
  return (
    <div className="app-container">
		  
		<Header></Header>
		  
    	<SearchBox></SearchBox>

    </div>
  );
}

export default App;
