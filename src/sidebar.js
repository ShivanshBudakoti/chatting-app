import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import db from "./firebase";
import { useNavigate } from "react-router-dom";
import SidebarChat from "./sidebarchat";
import { useStateValue } from ".";
const Sidebar=(props)=>{
    const history=useNavigate();
    const [room,setroom]=useState([]);
    const [{photo,user,Display}] = useStateValue();
    const [Search,setSearch]=useState('');
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
    const search=(e)=>{
        e.preventDefault();
        console.log(room);
       const index= room.findIndex((room)=>
      { return room.data.name===Search});
       const id =room[index].id;
       console.log(id);
       history('/room/'+id)
   
    console.log(room);
    }
    return(
        <Container className={Display&&"Notshown"}>
            <Navbar>
            <Userimg src={photo}/> 
            <span>{user.displayName}</span>
           <Menu>
               <div></div>
               <div></div>
               <div></div>
           </Menu>
            </Navbar>
            <ChatContainer>  
            <Header>
                <img src="https://cdn-icons-png.flaticon.com/512/900/900930.png"/>
                <form onSubmit={search}>
                <input  placeholder="Search" type='text' onChange={(e)=>setSearch(e.target.value)}></input>
                </form>
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

border-right:2px solid grey;
// background-color:white;
background-color:whitesmoke;
@media (max-width:680px){
    width:100%;
    span{
        position:relative;
        left:-110px;
    }
}

`;
const Navbar=styled.div`
height:100px;
border-bottom:2px solid grey;
display:flex;
padding:9px;
justify-content:space-around;
background-color:whitesmoke;
// background-image: radial-gradient(circle, black 10px, transparent 11px);
// background-size: 100% 33.33%;
    span{
        color:blue;
        width:fit-content;
        padding:7px;
        margin:auto;
       
    }
  `;
const ChatContainer=styled.div``; 
const Userimg=styled.img`
border:10px;
border-radius:50%;
padding:10px;`;
const Menu=styled.div`
display:flex;
width:8px;
flex-direction:column;
justify-content:center;
padding-right:10px;
div{
    height:3px;
    width:3px;
    border:2px solid black;
    border-radius:100%;
    padding:1px;
    background-color:black;
    margin-bottom:5px;
}
`;

const Header=styled.div`
display:flex;
justify-content:space-around;
background-color:whitesmoke;
img{
    height:44px;
    padding:2px;
    margin:0px;
};
form{
    width:100%;
    padding:5px;
}
input{
    background-color:whitesmoke;
    height:40px;
    padding:2px;
    margin-right:2px;
    border:none;
    width:100%;
}`;
export default Sidebar