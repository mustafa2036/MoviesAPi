import Axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom'
import React , {useState} from 'react'

export default function Register() {

  const [errorList, seterrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:''
  });

  function getUserData(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegisterForm(e){
    e.preventDefault();
    setIsLoading(true)
    let validtioReult = validRegisterForm();

    if(validtioReult.error){
      seterrorList(validtioReult.error.details)
      setIsLoading(false)
    }
    else{
      let {data} = await Axios.post('https://sticky-note-fe.vercel.app/signup',user);
      
      if(data.message === 'success'){
        // navigtio login || Home
        setIsLoading(false);
        navigate('../Login');
      }
      else{
        setError(data.message)
        setIsLoading(false)
      }
    }

  }

  function validRegisterForm(){
    let scheme = Joi.object({
      first_name: Joi.string().alphanum().min(4).max(13).required(),
      last_name: Joi.string().alphanum().min(3).max(13).required(),
      age: Joi.number().min(16).max(50).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Za-z0-9]{4,15}$')).required()
    });
    return scheme.validate(user, {abortEarly:false})
  }

  return (
    <>
    <div className="w-75 mx-auto">
      <h2>Register Now</h2>
      {errorList.map((error , i)=> i === 4?<div className='alert py-3 alert-danger'>Passwrod Invalid</div>
      :<div className='alert py-3 alert-danger'>{error.message}</div>)}
      {error?<div className='alert alert-danger'>{error}</div>:''}
      <form onSubmit={submitRegisterForm}>
        <label htmlFor="first_name">first_name :</label>
        <input onChange={getUserData} type="text" className='form-control mb-4' id='first_name' name='first_name'/>

        <label htmlFor="last_name">last_name :</label>
        <input onChange={getUserData} type="text" className='form-control mb-4' id='last_name' name='last_name'/>

        <label htmlFor="age">age :</label>
        <input onChange={getUserData} type="number" className='form-control mb-4' id='age' name='age'/>

        <label htmlFor="email">email :</label>
        <input onChange={getUserData} type="email" className='form-control mb-4' id='umail' name='email'/>

        <label htmlFor="password">user_password :</label>
        <input onChange={getUserData} type="password" className='form-control mb-4' id='password' name='password'/>

        <button type='submit' className='btn btn-outline-info'>
          {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}
         </button>
      </form>
    </div>
    </>
  )
}
