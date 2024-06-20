import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
