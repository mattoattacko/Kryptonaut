// This is our own custom hook
// Logic for fetching the gif based on a specific keyword

import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGifs = async () => {
    try {
      // response is our query. Fetches the gif
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);

      // destructure the response
      const { data } = await response.json();

      // sets the state of our gif 
      setGifUrl(data[0]?.images.downsized_medium?.url);

    } catch (error) {
      setGifUrl('https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif')
    }
  }

  // our useEffect is going to happen whenever the keyword changes
  useEffect(() => {
    // if the keyword changes
    if (keyword)
      // fetch the gif
      fetchGifs();
  }, [keyword]);

  return gifUrl;
}

export default useFetch;