import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Store } from './store';
import backGround from './assets/images/Gaming0_generated.jpg';
// NAV

// MODULES
import Lobby from './modules/matchmaking/';
import SignUp from './modules/user/';

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
