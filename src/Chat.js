import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from ".";
import firebase from "firebase/compat/app";
import db from "./firebase";
const ChattingRoom=(props)=>{
    const [input,setinput]=useState("");
    const {id}=useParams();
    const [mssg,Setmssg]=useState([]);
    const [roomName,setroomName]=useState("");
    const [{ photo}]=useStateValue();
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
       if(id){
           db.collection('Room').doc(id).onSnapshot((res)=>{setroomName(res.data().name)});
           db.collection('Room').doc(id).collection('mssg').orderBy('timestamp','asc').onSnapshot(
               res=>(Setmssg(res.docs.map(doc=>doc.data()))));
       }
    },[id])
    const sendmssg=(e)=>{
  e.preventDefault();
  console.log(input);
  db.collection('Room').doc(id).collection('mssg').add({
      message:input,
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  })
  setinput('');
    }
    return(
        
        <Wrapper>
            <Navbar>
            <img src={photo}/>
            <div>
                <h3 style={{margin:0}}>{roomName}</h3>
                <p style={{margin:0}}>{new Date(
                    mssg[mssg.length-1]?.
                    timestamp?.toDate())
                    .toUTCString()
                }</p>
                </div>
           <Menu><div></div>
               <div></div>
               <div></div></Menu>
            </Navbar>
            <ChatContainer>  
                {
                    mssg.map((message)=>( <Message className={message.name!==user.displayName ?"NotUser":"User"}>
                       {message.name!==user.displayName&& <span>{message.name} :</span>}
                        <p >{message.message} <span>{new Date(message.timestamp?.toDate()).toUTCString()}</span> </p>
                        
                        </Message>)
                    )
                }
                
            </ChatContainer>
            <Footer>

                <Emoji src="https://imgs.search.brave.com/WqaoreT5kOvG4NM5SEYPG0fC-FIXtiuXvORsR2Irl0o/rs:fit:600:600:1/g:ce/aHR0cHM6Ly93d3cu/c2ltcGx5c3RhbXBz/LmNvbS9tZWRpYS9j/YXRhbG9nL3Byb2R1/Y3QvNy85Lzc5MDMt/d2luay1mYWNlLWVt/b2ppLXN0YW1wLWhj/Yi5wbmc"/>
                <form>
                <input placeholder="Type a message" value={input} onChange={(e)=>setinput(e.target.value)} type="text"/>
                <button type="submit" onClick={sendmssg}>Send</button>
                </form>
            </Footer>
        </Wrapper>
    )
}
const Wrapper=styled.div`
width:100%;
background-color:blue;
display:flex;
flex-direction:column;
`;

const Navbar=styled.div`
height:100px;
display:flex;
align-items:center;
justify-content:end;
background-color:rgb(219,219,219);
cursor:pointer;
img{
    margin-right:10px;
    height:50px;
    border-radius:50%;
}
min-width:100px;
`;
const ChatContainer=styled.div`
flex:1;
background-image:url("https://imgs.search.brave.com/PQ2lzfvMadqRpMHLTAGxyCHzRTIT5sS2vKnWHU2QAk0/rs:fit:750:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQ0MTA3/MjEuanBn");
background-repeat:repeat;
background-position:center;
padding:30px;
overflow:scroll;
overflow-x:hidden;
`;
const Footer=styled.footer`
display:flex;
background-color:white;
height:62px;
align-items:center;
border-bottom:20px;
form{
    flex:1;
    display:flex;
    align-items:center;
input{
    flex:1;
    font-size:20px;
    border-radius:30px;
    height:60px;
    margin-left:10px;
    padding:5px;
}
}
padding:10px;
form{
button{
    height:100%;
    margin:5px;
    padding-top:10px;
    padding:4px;
    align-items:center;
    font-weight:770;
    font-size:20px;
    border:1px solid grey;
   border-radius:10px;
   cursor:pointer;
    &:hover{
        transform:scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
}
}
`;
const Menu=styled.div`
display:flex;
width:10px;
flex-direction:column;
justify-content:center;
padding-right:20px;
margin-left:10px;
div{
    border:1px solid black;
    border-radius:100%;
    padding:3px;
    margin:0;
    margin-bottom:3px;
    &:hover{

    }
}`;
const Message=styled.div`

p{
    height:10px;
    width:fit-content;
    display:flex;
align-items:center;
}
span{
    font-weight:580;
     font-size:10px;
     margin:10px;
    }
;

};

`;
const Emoji=styled.img`
display:flex;
height:50px;
padding:10px;
`;

export default ChattingRoom;