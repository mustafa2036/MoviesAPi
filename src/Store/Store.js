import axios from 'axios';
import React, {useEffect, useState , createContext} from 'react';

export let MoviesContext = createContext(0)

export default function MoviesContextProvider(props){

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPerson, setTrendingPerson] = useState([]);
  
    async function getTrnding(mediaType , callback){
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=517bf03e41f4d68784b4d867d7274ef7`);
      callback(data.results.slice(0,10));
    }
  
    useEffect(()=>{
      getTrnding('movie' , setTrendingMovies);
      getTrnding('tv' , setTrendingTv);
      getTrnding('person' , setTrendingPerson);
    }, [])
    return <MoviesContext.Provider value={{trendingMovies , trendingTv , trendingPerson}}>
        {props.children}
    </MoviesContext.Provider>
}