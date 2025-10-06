import React from 'react';
import MovieSearch from './MovieSearch';
import './App.css';

function App() {
  return (
    <div className="app-bg">
      <header className="hero-header">
        <h1>🎬 Movie Library!</h1>
        <p>Discover, search, and fall in love with movies</p>
      </header>
      <MovieSearch />
      <footer className="footer">
        <p>Made with 🤍 for SQAC Club Recruitment 2025</p>
      </footer>
    </div>
  );
}

export default App;
