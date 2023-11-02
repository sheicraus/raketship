import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default useFetch = (endpoint, params) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '5159627b46msh790efad6ce9eff2p1bbb5djsn10237faeae59',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: params
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      // console.log(response);
      setData(response.data.data);
    } catch (e) {
      setError(e);
      alert(e);
    } 

    setIsLoading(false);
  }

  const refetch = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return {data, error, isLoading, refetch}
}

