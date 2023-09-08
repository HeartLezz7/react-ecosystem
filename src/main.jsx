import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL="https://jsonplaceholder.typicode.com";

function HomePage() {
  const [friend,setFriend] = useState([]);
  const navigate = useNavigate();

  const fetchFriend = async () => {
    try {
      const response = await axios.get('/users');
      setFriend(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = (userId) => {
    if (userId == 1 ) navigate("/profile");
    else navigate(`/profile/${userId}`);
  }

  useEffect(()=>{
    fetchFriend();
  }, []);


  return(
  <div className='App'>
    <h1>Home Page</h1>
    {friend.map((friend)=>     
    <div className='friend' 
    key={friend.id}
    onClick={()=>handleNavigate(friend.id)}
    >
      <h4>{friend.name}</h4>
      <h3>{friend.email}, {friend.phone}</h3>
    </div>)}

    </div>)
}
function ProfilePage() {
  return<div className='App'>Profile Page</div>
}
function FriendPage() {
  const {userId} = useParams();
  const [friend,setFriend] = useState(null);
  console.log(userId)
  
  const fetchFriendDetail = async() => {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      setFriend(data);
    } catch (error) {
      console.log(error)
    }
  };
  
  useEffect(()=>{
    fetchFriendDetail();
  },[])
  
  return(
    <div className='App'>
    {friend&&
    (<div className='friend'>
      <h3>{friend.name}</h3>
      </div>)}
    </div>)
}

function FeedPage() {
  return<div className='App'>Feed Page</div>
}
// function NotFoundPage() {
//   return <div className='App'>404 : Not Found</div>
// }

function AppLayout() {
  return(
    <>
    <div>
    <Link to="/">home</Link>
    <Link to="/profile">profile</Link>
    <Link to="/profile/1">friend</Link>
    <Link to="/feed">feed</Link>
    </div>
    <div>
      <Outlet/>
    </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <div className='content'>
    <Routes>
      <Route path='/'  element={<AppLayout/>}>
        <Route path='' element={<HomePage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='profile/:userId' element={<FriendPage/>}/>
        <Route path='feed' element={<FeedPage/>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
      </Route>
    </Routes>
  </div>
</BrowserRouter>)

  {/* <div className='content'>
    <nav>
    <Link to="/">home</Link>
    <Link to="/profile">profile</Link>
    <Link to="/profile/1">friend</Link>
    <Link to="/feed">feed</Link>
    </nav>
    <Routes>
    <Route path = "/" element={<HomePage text="Home Page"/>}/>
    <Route path = "/profile" element={<TitlePage text="Profile Page"/>}/>
    <Route path = "/profile/:userId" element={<FriendPage/>}/>
    <Route path = "/feed" element={<TitlePage text="Feed Page"/>}/>
    <Route path = "/*" element={<NotFoundPage/>}/>
    <Route path='*' element={<Navigate to ="/"/>} />
    </Routes>
  </div> */}
