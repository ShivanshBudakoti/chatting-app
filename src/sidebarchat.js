import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from ".";
import { actionTypes } from "./reducer";
import db from "./firebase";
const SidebarChat=({addNewchat,name,id})=>{
    console.log(name)
    const[{Display},dispatch]=useStateValue();
    
    const[messages,setmessages]=useState([]);
    const createChat=()=>{
        const roomname=prompt('please enter name for chat');
        if(roomname)
        {
          db.collection('Room').add({
              name:roomname
          })
        }
    }
    useEffect(()=>{
        if(id){
        db.collection('Room')
        .doc(id)
        .collection('mssg')
        .orderBy('timestamp','desc')
        .onSnapshot((res)=>{
            setmessages(res.docs.map((doc)=>doc.data()));
        })
        
    }
    },[id])
return !addNewchat?
   (<Link to={`/room/${id}`}>
    <div onClick={()=>{dispatch({
     type:actionTypes.SET_DISPLAY,
        Display:true
    })}}>
        <Wrapper>
        <img src="https://cdn-icons.flaticon.com/png/512/552/premium/552848.png?token=exp=1647263428~hmac=b7bdfb7eb4b05470f3867d199a98c115"/>
        <div> 
            <h3 style={{margin:0}}>{name}</h3>
         <p style={{margin:0}}>{messages[0]?.message}</p>
         </div>
      </Wrapper>
    </div>
    </Link>
):(
    <Wrapper>
    <div onClick={createChat}>
        <h2>Add new chat</h2>
    </div>
    </Wrapper>
)
}
const Wrapper=styled.div`
margin-left:5px;
padding:10px;
display:flex;
height:70px
width:100%;
align-items:center;
// color:blue;
color:blue;
cursor:pointer;
&:hover{
    background-color:white;
    color:black;
}
img{
    height:30px;
    width:30px;
    margin-right:7px;
}`;
export default SidebarChat;