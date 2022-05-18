import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// MODULES
import ScoreBoard from './modules/scoreboard/'
import Lobby from './modules/matchmaking/'

function App() {
  return (
    <div className="App">
            <Router>
            <div className="container">
              <Routes>
                <Route path="/" element={<Lobby/>} />
              </Routes>
            </div>
          </Router>
    </div>
  );
}

export default App;
