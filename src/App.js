import './App.css';
import React from 'react';
import ScibowlScrimHome from './pages/ScibowlScrimHome';
import ScibowlScrimSingleplayer from './pages/ScibowlScrimSingleplayer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<ScibowlScrimHome />}/>
        <Route exact path='/singleplayer' element={<ScibowlScrimSingleplayer />}/>
      </Routes>
    </Router>
  );
}

export default App;