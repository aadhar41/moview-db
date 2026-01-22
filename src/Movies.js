import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const { movies, loading } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="movies">
      {movies.map((movie) => {
        const { imdbID, Title, Year, Poster } = movie;
        return (
          <Link to={`/movie/${imdbID}`} key={imdbID} className="movie">
            <article>

              <img src={Poster === 'N/A' ? url : Poster} alt={Title} onError={(e) => (e.target.src = url)} />
              <div className="movie-info">
                <h4>{Title}</h4>
                <p>{Year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
}

export default Movies
