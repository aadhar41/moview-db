import React, { useState, useContext, useEffect } from 'react'
import useFetch from './useFetch';

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('avengers');
  const { loading, error, data: movies } = useFetch(`&s=${query}`);

  return <AppContext.Provider value={{ movies, loading, error, query, setQuery }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider }
