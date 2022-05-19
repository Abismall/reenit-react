import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// NAV

// MODULES
import ScoreBoard from './modules/scoreboard/'
import Lobby from './modules/matchmaking/'
import UserPage from './modules/user/'
function App() {
  return (
    <div className="App">
      <Router>
            <div className="container">
              <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/signup" element={<UserPage/>}/>
            <Route path="/highscore" element={<ScoreBoard/>}/>
              </Routes>
            </div>
          </Router>
    </div>
  );
}

export default App;
