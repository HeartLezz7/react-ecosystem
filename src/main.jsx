import React, { useState,createContext, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios';

const AuthContext = createContext();


function ContextProvider (props) {
  const [isAuth,setIsAuth] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [user,setUser] = useState({name: "Guest"});
  const BASE_URL = "https://jsonplaceholder.typicode.com/users";

  // isAuth : false => true ให้ Delay 1 วิ
  // useEffect (()=>{
  //   if(isLoading){
  //     setTimeout(()=>{
  //       setIsLoading(false)
  //     },1000)
  //   }
  // },[isLoading])

  // const handleAuth = () => {
  //   if(!isAuth) {
  //     setIsLoading(true)
  //   }
  //   setIsAuth(!isAuth)
  // }
  // const handleAuth = () => {
  //   if(!isAuth) {
  //     setIsLoading(true)
  //     setTimeout(() => {
  //       setIsAuth(true)
  //       setIsLoading(false)
  //     }, 2000);
  //   }
  //   setIsAuth(!isAuth)
  // }

  const handleAuth = async () => {
    if (isAuth){
      setIsAuth(false);
      setUser({name: "Guest"});
      return;
    }
      try {
        setIsLoading(true)
        const response = await axios.get(`${BASE_URL}/1`);
        console.log(response.data);
        setUser(response.data);
        setIsAuth(true)
      } catch (error) {
        console.log(error)
      }finally{
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    
  }

  const sharedObj = {isAuth,handleAuth,isLoading,user}
  return <AuthContext.Provider value={sharedObj}> {props.children}</AuthContext.Provider>
}

function App() {
  // const [isAuth,setIsAuth] = useState(false);
  // const handleAuth = () => {setIsAuth(!isAuth)}
  const {isAuth,handleAuth,isLoading,user} = useContext(AuthContext);

  return(
    <div className='App'>
      {isLoading? <h1>Loading...</h1> : <h1>Welcome : {!isAuth ? user?.name:user?.name}</h1>}
   
    <button onClick={handleAuth}>{!isAuth?"login" :"logout"}</button>
  </div>
) 
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>

  <App/>
  </ContextProvider>
)
