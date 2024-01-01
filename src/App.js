import './App.css';
import React from 'react';
import ScibowlScrimHome from './pages/ScibowlScrimHome';
import ScibowlScrimSingleplayer from './pages/ScibowlScrimSingleplayer';
import ScibowlScrimMultiplayer from './pages/ScibowlScrimMultiplayer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<ScibowlScrimHome />}/>
      <Route exact path='/singleplayer' element={<ScibowlScrimSingleplayer />}/>
      <Route exact path='/multiplayer' element={<ScibowlScrimMultiplayer />}/>
      </Routes>
    </Router>
  );
}

export default App;