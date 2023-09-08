import React, { useState,createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const AuthContext = createContext();

function ContextProvider (props) {
  const [isAuth,setIsAuth] = useState(false);
  const handleAuth = () => {setIsAuth(!isAuth)}


  const sharedObj = {isAuth,handleAuth}
  return <AuthContext.Provider value={sharedObj}> {props.children}</AuthContext.Provider>
}

function App() {
  // const [isAuth,setIsAuth] = useState(false);
  // const handleAuth = () => {setIsAuth(!isAuth)}
  const {isAuth,handleAuth} = useContext(AuthContext);

  return(
    <div className='App'>
    <h1>Welcome : {!isAuth ? "Guest":"User"}</h1>
    <button onClick={handleAuth}>{!isAuth?"login" :"logout"}</button>
  </div>
) 
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>

  <App/>
  </ContextProvider>
)
