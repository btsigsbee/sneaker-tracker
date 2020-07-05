import React from 'react';

import axios from'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homeboard from './components/homeboard.js';
import Search from './components/search.js';

function App() {
  return (
    
    <div className="App">
      <Search />
      <Homeboard/>
      
    </div>
  );
}

export default App;
