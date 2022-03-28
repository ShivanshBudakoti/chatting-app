import React, { useState } from 'react';
import {Route,BrowserRouter as Router,Routes as Switch }from 'react-router-dom';
import { useStateValue } from '.';
import ChattingRoom from './Chat';
import Login from './login';
import Sidebar from './sidebar';
function App() { 
  const [{ user }, dispatch]=useStateValue();
  return (
    <div className="App">
    <div className={user && 'body'} >
      {/* sidebar+chat */}
      <Router>
     {!user?(
       <Login/>
      //  console.log(user)
     ):(
     <>
      <Sidebar/>
        <Switch>
          <Route  path='/' element={ <ChattingRoom/>}/>
          <Route  path='/room/:id' element={<ChattingRoom notshown={false}/>}/>
        </Switch>
     </>
     )}
     </Router>
    </div>
    </div>
  );
}

export default App;
