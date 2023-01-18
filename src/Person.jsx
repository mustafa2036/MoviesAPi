import React, {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar from './images.png'
// import { MoviesContext } from './Store/Store';

export default function Person() {

  const [trendingPerson, setTrendingPerson] = useState([]);
  
    async function getTrnding(mediaType , callback){
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=517bf03e41f4d68784b4d867d7274ef7`);
      setTrendingPerson(data.results);
    }

    useEffect(()=>{
      getTrnding('tv' , setTrendingPerson);
    }, [])
  
  return (
    <>
    {trendingPerson?<div className="row justify-content-center">
    {trendingPerson.map((person, i) =>  <div key={i} className='col-md-3'>
      <div className="images my-2">
        <Link to={`/persondetalis/${person.id}`}>
        <span className='bg-dark text-light position-absolute end-0 py-1 px-2'>
            {person.popularity}
        </span>
        {person.profile_path === null ? <img src={avatar} alt='' className="w-100" /> :
          <img src={"https://image.tmdb.org/t/p/w500"+person.profile_path} className="w-100" alt="" />}
          <div className='text-white py-5 item px-3'>
              <h2 className='h3 my-3'>{person.name}</h2>
              <p>{person.overview}</p>
          </div>
        </Link>
      </div>
    </div> )}
    </div>: <div className='vh-100 d-flex justify-content-center align-items-center'>
          <i className='fas fa-spinner fa-spin fs-1'></i>
      </div>}
  </>
  )
}
