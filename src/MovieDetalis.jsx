import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom'


export default function MovieDetalis() {

    let params = useParams()
    const [movieDetalis, setMovieDetalis] = useState(null)

    async function getMovieDetalis(id)
    {
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=517bf03e41f4d68784b4d867d7274ef7&language=en-US`)
    setMovieDetalis(data);
    }

    useEffect(()=> {
        getMovieDetalis(params.id);
    },[])

  return (
    <>
       {movieDetalis? <div className="row py-5">
            <div className="col-md-4 position-relative">
                <img src={`https://image.tmdb.org/t/p/w500`+movieDetalis.poster_path} className="w-100" alt="" />
                <span className='bg-dark text-light position-absolute end-0 py-2 px-3 mx-2 fw-bold'>
                    {movieDetalis.vote_average}
                </span>
            </div>
            <div className="col-md-9 py-4">
                <div>
                    <h3 className='my-2'> {movieDetalis.title} </h3>
                    <p className='text-muted mb-3 mt-2'> {movieDetalis.overview} </p>
                    <a className='text-info mb-3 mt-2' target='__blank' href={movieDetalis.homepage}>{movieDetalis.homepage}</a>
                    <ul className='my-3'>
                        <li className='fs-5 py-2 text-light'>runtime: {movieDetalis.runtime}</li>
                        <li className='fs-5 py-2 text-light'>vote_count: {movieDetalis.vote_count}</li>
                        <li className='fs-5 py-2 text-light'>release_date: {movieDetalis.release_date}</li>
                        <li className='fs-5 py-2 text-light'>popularity: {movieDetalis.popularity}</li>
                        <li className='fs-5 py-2 text-light'>original_language: {movieDetalis.original_language}</li>
                    </ul>
                </div>
            </div>
        </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
            <i className='fas fa-spinner fa-spin fs-1'></i>
        </div>} 
    </>
  )
}
