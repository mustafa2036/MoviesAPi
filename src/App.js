import './App.css';


import {Routes , Route , Navigate , useNavigate} from 'react-router-dom'
import Navbar from './Header/Navbar';
import Home from './Home/Home';
import Contact from './Content/Contact';
import Movies from './Movies/Movies';
import Tv from './Tv'
import Person from './Person';
import Register from './Register/Register' 
import NotFound from './NotFound';
import Footer from './Footer';
import Login from './Login';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetalis from './MovieDetalis';
import TvDetalis from './TvDetalis';
import PersonDetalis from './PersonDetalis';
import MoviesContextProvider from './Store/Store';

function App() {

  const [userData, setUserData] = useState(null)
  let navigate = useNavigate

  function saveUserData(){
    let decodedToken = localStorage.getItem('userToken');
    let encodedToken = jwtDecode(decodedToken);
    setUserData(encodedToken)
    // console.log(encodedToken);
  }

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken') === null){
      // back login
      return <Navigate to='/Login'/>
    }
    else{
      return props.children;
      // back everyPage
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveUserData()
    }
  }, [])

  function logOut(){
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }
  return (
    <>
    <MoviesContextProvider>
      <Navbar logOut={logOut} userData={userData} />
      <div className='container'>
        <Routes>
          <Route path='' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='home' element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='movies' element={ <ProtectedRoute><Movies/></ProtectedRoute> }/>
          <Route path='moviedetalis' element={ <ProtectedRoute><MovieDetalis/></ProtectedRoute> }>
            <Route path=':id' element={ <ProtectedRoute><MovieDetalis/></ProtectedRoute> }/>
          </Route>
          <Route path='contact' element={ <ProtectedRoute><Contact/></ProtectedRoute> }/>
          <Route path='tv' element={ <ProtectedRoute><Tv/></ProtectedRoute> }/>
          <Route path='tvdetalis' element={ <ProtectedRoute><TvDetalis/></ProtectedRoute> }>
            <Route path=':id' element={ <ProtectedRoute><Tv/></ProtectedRoute> }/>
          </Route>
          <Route path='person' element={ <ProtectedRoute><Person/></ProtectedRoute> }/>
          <Route path='persondetalis' element={ <ProtectedRoute><PersonDetalis/></ProtectedRoute> }>
            <Route path=':id' element={ <ProtectedRoute><PersonDetalis/></ProtectedRoute> }/>
          </Route>
          <Route path='login' element={<Login saveUserData={saveUserData} />}/>
          <Route path='register' element={<Register/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
      </MoviesContextProvider>
    </>
  );
}

export default App;
