import css from './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Store } from './store';
import backGround from './assets/images/Gaming0_generated.jpg';
// NAV

// COMPONENTS
import Lobby from './components/matchmaking/index';
import SignUp from './components/user/index';

function App() {
  return (
    <div className="App">
      <Store>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Lobby />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </Store>
    </div>
  );
}

export default App;
