import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

export default function TvDetalis() {

    let params = useParams()
    const [tvDetalis, setTvDetalis] = useState(null)

    async function getTvTrending(id)
    {
    let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=517bf03e41f4d68784b4d867d7274ef7&language=en-US`)
    setTvDetalis(data);
    }

    useEffect(() => {
        getTvTrending(params.id);
    },[]);

  return (
    <>
     {tvDetalis? <div className="row py-5">
            <div className="col-md-4 position-relative">
                <img src={`https://image.tmdb.org/t/p/w500`+tvDetalis.poster_path} 
                className="w-100" alt="" />
                <span className='bg-dark text-light position-absolute end-0 py-2 px-4 mx-2 fw-bold'>
                    {tvDetalis.vote_average}
                </span>
            </div>
            <div className="col-md-9 py-4">
                <div>
                    <h3 className='my-2'> {tvDetalis.name} </h3>
                    <p className='text-muted mt-2 mb-3'> {tvDetalis.overview} </p>
                    <a href={tvDetalis.homepage} target='__blank' className='text-info mb-2 mt-3'>{tvDetalis.homepage}</a> 
                    <ul className='my-3'>
                        <li className='fs-5 py-2 text-light'>vote_count: {tvDetalis.vote_count}</li>
                        <li className='fs-5 py-2 text-light'>first_air_date: {tvDetalis.first_air_date}</li>
                        <li className='fs-5 py-2 text-light'>popularity: {tvDetalis.popularity}</li>
                    </ul>
                </div>
            </div>
        </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
            <i className='fas fa-spinner fa-spin fs-1'></i>
        </div>} 
    </>
  )
}
