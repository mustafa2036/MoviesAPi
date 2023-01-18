import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Tv() {


  const [trendingTv, setTrendingTv] = useState([]);

  let nums = new Array(20).fill(1).map((ele , index)=> index + 1)

  async function getTrnding(pageNumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=517bf03e41f4d68784b4d867d7274ef7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setTrendingTv(data.results);
  }

  useEffect(()=>{
    getTrnding();
  }, [])


  return (
    <>
      {trendingTv?<div className="row justify-content-center">
      {trendingTv.map((tv, i) =>  <div key={i} className='col-md-3'>
        <div className="images my-2">
          <Link to={`/tvdetalis/${tv.id}`}>
            <span className='bg-dark text-light position-absolute end-0 py-1 px-3'>
                {tv.vote_average}
            </span>
            <img src={"https://image.tmdb.org/t/p/w500"+tv.poster_path} className="w-100" alt="" />
            <div className='text-white py-5 item px-3'>
                <h2 className='h4 my-3'>{tv.name}</h2>
                <p>{tv.overview}</p>
                <h6>{tv.first_air_date}</h6>
                <small>{tv.origin_country}</small>
            </div>
          </Link>
        </div>
      </div> )}
      </div>: <div className='vh-100 d-flex justify-content-center align-items-center'>
            <i className='fas fa-spinner fa-spin fs-1'></i>
        </div>}

        <nav aria-label="...">
          <ul className="pagination pagination-sm d-flex justify-content-center py-5">
            {nums.map((pageNum) =><li onClick={()=> getTrnding(pageNum)} key={pageNum} className="cursor page-item">
              <a className="page-link bg-transparent text-white">{pageNum}</a>
            </li>)}
          </ul>
        </nav>
      
    </>
  )
}
