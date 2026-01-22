import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {
  const { query, setQuery, fetchMovies, error } = useGlobalContext();

  return (
    <>
      <form className='search-form' onSubmit={(e) => {
        e.preventDefault();
        fetchMovies();
      }}>
        <h2>search movie </h2>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='search' className='form-input' />
        {error.show && <div className='error'>{error.msg}</div>}
      </form>
    </>
  );
}

export default SearchForm
