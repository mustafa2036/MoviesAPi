import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  let nums = new Array(20).fill(1).map((ele , index)=> index + 1)

  async function getTrnding(pageNumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=517bf03e41f4d68784b4d867d7274ef7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setTrendingMovies(data.results);
  }

  useEffect(()=>{
    getTrnding();
  }, [])

  return (
    <>
      {trendingMovies?<div className="row justify-content-center">
      {trendingMovies.map((movie , i) =>  <div key={i} className='col-md-3'>
        <div className="images my-2">
          <Link to={`/moviedetalis/${movie.id}`}>
            <span className='bg-dark text-light position-absolute end-0 py-1 px-3'>
                {movie.vote_average}
            </span>
            <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="w-100" alt="" />
            <div className='text-white py-5 item px-3'>
              <h2 className='h4 my-3'>{movie.title}</h2>
              <p>{movie.overview}</p>
              <span>{movie.release_date}</span>
            </div>
          </Link>
        </div>
      </div> )}
      </div>: <div className='vh-100 d-flex justify-content-center align-items-center'>
            <i className='fas fa-spinner fa-spin fs-1'></i>
        </div>}

        <nav aria-label="...">
          <ul className="pagination pagination-sm d-flex justify-content-center py-5">
            {nums.map((pageNum) =><li onClick={()=> getTrnding(pageNum)} key={pageNum} 
            className="cursor page-item">
              <a className="page-link bg-transparent text-white" href>{pageNum}</a>
              </li>)}
          </ul>
        </nav>
      
    </>
  )
}
