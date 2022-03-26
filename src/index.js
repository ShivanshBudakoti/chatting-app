import React, { createContext, useReducer,useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer,{initialState} from './reducer';



export const StateContext=createContext();
export const StateProvider=({reducer,initialState,children})=>(
  <StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue=()=>useContext(StateContext);
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState}
    reducer={reducer}>
              <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root') 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
