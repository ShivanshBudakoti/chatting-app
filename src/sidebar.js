import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import db from "./firebase";
import SidebarChat from "./sidebarchat";
import { useStateValue } from ".";
const Sidebar=(props)=>{
    const [room,setroom]=useState([]);
    const [{photo}] = useStateValue();
    useEffect(()=>{
        const unsubscribe = db.collection('Room')
   .onSnapshot((snapshot)=>{
       setroom(snapshot.docs.map((doc)=>({
           id:doc.id,
           data:doc.data()
       })))
    console.log(snapshot);
    snapshot.docs.map((doc)=>{
   console.log(doc.data())
    })});
    return()=>{
   unsubscribe();
    }
    },[])
    return(
        <Container>
            <Navbar>
            <Userimg src={photo}/> 
           <Menu>
               <div></div>
               <div></div>
               <div></div>
           </Menu>
            </Navbar>
            <ChatContainer>  
            <Header>
                <img src="https://cdn-icons-png.flaticon.com/512/900/900930.png"/>
                <input placeholder="Search" type='text'></input>
            </Header>
            <SidebarChat addNewchat/>
            {
                room.map(room=>(
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name}/>
                ))
            }
            </ChatContainer>
        </Container>
    )
}
const Container=styled.div`
height:100%;
width:25vw;
border-right:3px solid grey;
background-color:white;
`;
const Navbar=styled.div`
height:100px;
border-bottom:3px solid grey;
display:flex;
padding:9px;
justify-content:space-between;
background-color:rgb(219,219,219);
// background-image: radial-gradient(circle, black 10px, transparent 11px);
// background-size: 100% 33.33%;
    
  `;
const ChatContainer=styled.div``; 
const Userimg=styled.img`
border:10px;
border-radius:50%;`;
const Menu=styled.div`
display:flex;
width:10px;
flex-direction:column;
justify-content:center;
padding-right:20px;
div{
    height:3px;
    width:3px;
    border:2px solid black;
    border-radius:100%;
    padding:2px;
    background-color:black;
    margin-bottom:5px;
}
`;

const Header=styled.div`
display:flex;
justify-content:space-between;
background-color:white;
img{
    height:44px;
    padding:2px;
    margin:0px;
};
input{
    height:40px;
    padding:2px;
    margin-right:2px;
    border:none;
}`;
export default Sidebar