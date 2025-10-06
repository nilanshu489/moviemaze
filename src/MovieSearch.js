import React, { useState } from 'react';

const defaultMovies = [
  {
    imdbID: 'tt4154796',
    Title: 'Avengers: Endgame',
    Year: '2019',
    Poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
  },
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg'
  },
  {
    imdbID: 'tt7286456',
    Title: 'Joker',
    Year: '2019',
    Poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  }
];

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const apiKey = '28f1c679'; // Replace with your OMDB API key
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert('No movies found!');
      }
    } catch (error) {
      alert('Error fetching movies');
    }
    setLoading(false);
  };

  // Show search results if any, else show default movies
  const moviesToShow = movies.length > 0 ? movies : defaultMovies;

  return (
    <section className="search-section">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={handleInputChange}
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {loading && <div style={{ textAlign: 'center', marginTop: '2rem' }}>🔄 Loading...</div>}
      <div className="movies-grid">
        {moviesToShow.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270/222222/cccccc?text=No+Image'}
              alt={movie.Title}
              className="movie-poster"
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/180x270/222222/cccccc?text=No+Image';
              }}
            />
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieSearch;
