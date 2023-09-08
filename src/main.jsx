import React, { useState,createContext, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const AuthContext = createContext();

function ContextProvider (props) {
  const [isAuth,setIsAuth] = useState(false);
  const [isLoading,setIsLoading] = useState(false)

  // isAuth : false => true ให้ Delay 1 วิ
  useEffect (()=>{
    if(isLoading){
      setTimeout(()=>{
        setIsLoading(false)
      },1000)
    }
  },[isLoading])

  const handleAuth = () => {
    if(!isAuth) {
      setIsLoading(true)
    }
    setIsAuth(!isAuth)
  }
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


  const sharedObj = {isAuth,handleAuth,isLoading}
  return <AuthContext.Provider value={sharedObj}> {props.children}</AuthContext.Provider>
}

function App() {
  // const [isAuth,setIsAuth] = useState(false);
  // const handleAuth = () => {setIsAuth(!isAuth)}
  const {isAuth,handleAuth,isLoading} = useContext(AuthContext);

  return(
    <div className='App'>
      {isLoading? <h1>Loading...</h1> : <h1>Welcome : {!isAuth ? "Guest":"User"}</h1>}
   
    <button onClick={handleAuth}>{!isAuth?"login" :"logout"}</button>
  </div>
) 
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>

  <App/>
  </ContextProvider>
)
