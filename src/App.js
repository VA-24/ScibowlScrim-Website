import './App.css';
import React from 'react';
import ScibowlScrimSingleplayer from './pages/ScibowlScrimSingleplayer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<ScibowlScrimSingleplayer />}/>
      </Routes>
    </Router>
  );
}

export default App;