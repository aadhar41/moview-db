import React, { useState, useContext, useEffect } from 'react'
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (urlParams) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ show: false, msg: '' });
    const [data, setData] = useState([]);

    const fetchMovies = async () => {
        setLoading(true);
        const cache = JSON.parse(sessionStorage.getItem('movie_cache') || '{}');
        if (cache[urlParams]) {
            console.log('using cache', cache[urlParams]);
            setData(cache[urlParams]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINT}${urlParams}`);
            const data = await response.json();
            if (data.Response === 'True') {
                console.log('fetching from api', data);
                setData(data.Search || data);
                cache[urlParams] = data.Search || data;
                sessionStorage.setItem('movie_cache', JSON.stringify(cache));
                setError({ show: false, msg: '' });
            } else {
                setError({ show: true, msg: data.Error });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [urlParams]);

    return { loading, error, data };
}

export default useFetch