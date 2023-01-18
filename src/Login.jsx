import Axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom'
import React , {useState} from 'react'

export default function Login(props) {

  const [errorList, seterrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  function getUserData(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitLoginForm(e){
    e.preventDefault();
    setIsLoading(true)
    let validtioReult = validLoginForm();

    if(validtioReult.error){
      seterrorList(validtioReult.error.details)
      setIsLoading(false)
    }
    else{
      let {data} = await Axios.post('https://sticky-note-fe.vercel.app/signin',user);
      
      if(data.message === 'success'){
        setIsLoading(false);
        localStorage.setItem('userToken' , data.token);
        props.saveUserData()
        // saveUserData
        navigate('/Home');
      }
      else{
        setError(data.message)
        setIsLoading(false)
      }
    }

  }

  function validLoginForm(){
    let scheme = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Za-z0-9]{4,15}$')).required(),
    });
    return scheme.validate(user, {abortEarly:false})
  }

  return (
    <>
    <div className="w-75 mx-auto">
      <h2>Login Now</h2>
      {errorList.map((error , i)=> i === 1?<div className='alert py-3 alert-danger'>Passwrod Invalid</div>
      :<div className='alert py-3 alert-danger'>{error.message}</div>)}
      {error?<div className='alert alert-danger'>{error}</div>:''}
      <form onSubmit={submitLoginForm}>

        <label htmlFor="email">email :</label>
        <input onChange={getUserData} type="email" className='form-control mb-4' id='umail' name='email'/>

        <label htmlFor="password">user_password :</label>
        <input onChange={getUserData} type="password" className='form-control mb-4' id='password' name='password'/>

        <button type='submit' className='btn btn-outline-info'>
          {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}
        </button>
      </form>
    </div>
    </>
  )
}
