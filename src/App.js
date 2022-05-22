import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// NAV

// MODULES
import Lobby from './modules/matchmaking/';
import SignUp from './modules/user/';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
