import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import avatar from './images.png'


export default function PersonDetalis() {

    let params = useParams()
    const [personDetalis, setPersonDetalis] = useState(null)

    async function getPersonTrending(id)
    {
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=517bf03e41f4d68784b4d867d7274ef7&language=en-US`)
    setPersonDetalis(data);
    }

    useEffect(()=> {
        getPersonTrending(params.id);
    },[]);

  return (
     <>
     {personDetalis? <div className="row py-5">
            <div className="col-md-4">
            {personDetalis.profile_path === null ? <img src={avatar} alt='' className="w-100" /> :
            <img src={"https://image.tmdb.org/t/p/w500"+personDetalis.profile_path} className="w-100" alt="" />}
            </div>
            <div className="col-md-6 py-4">
                <div>
                    <h3> {personDetalis.name} </h3>
                    <h4> {personDetalis.original_name} </h4>
                    <ul>
                        <li className='fs-5 py-2 text-light'>known_for_department: {personDetalis.known_for_department}</li>
                        <li className='fs-5 py-2 text-light'>popularity: {personDetalis.popularity}</li>
                    </ul>
                </div>
            </div>
        </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
            <i className='fas fa-spinner fa-spin fs-1'></i>
        </div>} 
    </>
  )
}
