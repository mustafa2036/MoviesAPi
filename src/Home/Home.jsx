import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images.png'
import { MoviesContext } from '../Store/Store';
import './Home.css'

export default function Home() {
   

  let {trendingMovies , trendingTv , trendingPerson} = useContext(MoviesContext);

  return (
    <>
      

      <div className="row py-3 d-flex justify-content-center align-items-center">
        <div className="col-md-3 d-flex align-items-center">
          <div>
            <div className="content">
              <h2 className='h2'>Trending <br /> Movies <br /> to Watch Now</h2> 
              <p>Most Watched Movies days</p>
            </div>
          </div>
        </div>
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
      </div>
      <div className="row py-5 d-flex justify-content-center align-items-center">
        <div className="col-md-3">
          <div>
            <div className="content">
              <h2 className='h2'>Trending <br /> Tv <br /> to Watch Now</h2> 
              <p>Most Watched Tv days</p>
            </div>
          </div>
        </div>
        {trendingTv.map((tv , i) =>  <div key={i} className='col-md-3'>
          <div className="images my-2">
            <Link to={`/tvdetalis/${tv.id}`}>
              <span className='bg-dark text-light position-absolute end-0 py-1 px-2'>
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
      </div>
      <div className="row py-4 d-flex align-items-center justify-content-center">
        <div className="col-md-3">
          <div>
            <div className="content">
              <h2 className='h2'>Trending <br /> Person <br /> to Watch Now</h2> 
              <p>Most Watched Person days</p>
            </div>
          </div>
        </div>
        {trendingPerson.map((person , i) =>  <div key={i} className='col-md-3'>
          <div className="images my-2">
            <Link to={`/persondetalis/${person.id}`}>
            {person.profile_path === null ? <img src={avatar} className="w-100" alt='' /> :
              <img src={"https://image.tmdb.org/t/p/w500"+person.profile_path} className="w-100" alt="" />}
              <div className='text-white py-5 item px-3'>
                <h2 className='h3 my-3'>{person.name}</h2>
              </div>
            </Link>
          </div>
        </div> )}
      </div>
    </>
  )
}
