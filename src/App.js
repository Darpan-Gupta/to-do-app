import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import './App.css';
import HomePage from './Pages/HomePage';
function App() {
  return (
    <div className='main-div'>
      <Route path="/" component={HomePage} exact />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </div >


  )
}

export default App