import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT, useGlobalContext } from './context'
import useFetch from './useFetch';

const SingleMovie = () => {
  const { id } = useParams();
  const { loading, error, data: movie } = useFetch(`&i=${id}`);

  if (loading) {
    return (
      <div className="loading"></div>
    );
  }

  if (error.show) {
    return (
      <>
        <div className="page-error">
          <h1>{error.msg}</h1>
          <Link to="/">back to movies</Link>
        </div>
      </>
    );
  }

  const { Title: title, Poster: poster, Plot: plot, Year: year } = movie;

  return (
    <>
      <section className="single-movie">
        <img src={poster === 'N/A' ? 'https://via.placeholder.com/400x600' : poster} alt={title} />
        <div className="single-movie-info">
          <h2>{title}</h2>
          <p>{plot}</p>
          <h4>{year}</h4>
          <Link to="/" className="btn">back to movies</Link>
        </div>
      </section>
    </>
  );
}

export default SingleMovie
