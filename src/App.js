import './App.css';
import React from 'react';
import ScibowlScrimHome from './pages/ScibowlScrimHome';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<ScibowlScrimHome />}/>
      </Routes>
    </Router>
  );
}

export default App;