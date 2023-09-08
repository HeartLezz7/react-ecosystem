import React, { useState, createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Context
// 1. createContext [provider,consumer] => context name
const ThemeContext = createContext();

// A1. สรัาง HOC : Higher Order Componene (Provider)
// HOC คือ FC ที่รับ Component เข้าไปแลพ return Component ใหม่ออกมา
// function ThemeContextProvider(props) {
//   return<div>{props.children}</div>
// }

// Data : isDarkMode,styleObj
// Logic : setIsDarkMode,handleToggleTheme
const ThemeContextProvider = (props) => {
  const [isDarkMode,setIsDarkMode] = useState(true);
  
  function handleToggleTheme() {
    setIsDarkMode(!isDarkMode);
  }
  
  const styleObj = {
    backgroundColor :  isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };
  const shareObj = {magic:42,isDarkMode,handleToggleTheme,styleObj};
  return<ThemeContext.Provider value={shareObj}>{props.children}</ThemeContext.Provider>;
}
/*
A2. Share Data & Logic ผ่าน attrubute value
==> Data (state,boolean,string,object,array,etc...)
==> Logic (Fnที่ใช้ handle ต่างๆ)
*/

/* 
#### A3. นำ Provider ไปครอบ children [Provider]
  <ThemeContextProvider>
    <App/>
  </ThemeContextProvider>
*/

/* 
#### B1. @children Component ดึงค่า Shared object ผ่่านตัว useContext
SYNTAX : usecontext(contextName)
ex.
*/

// ##########################################
// ##########################################
// ##########################################

function App() {
  const s = useContext(ThemeContext);
  console.log(s)
  const {styleObj,handleToggleTheme} = useContext(ThemeContext);


  return (
    <div style={styleObj} className='App'>
      <h1>Theme App</h1>
      <button onClick={handleToggleTheme}>Toggle Theme</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App/>
  </ThemeContextProvider>
)
