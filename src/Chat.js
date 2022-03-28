import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from ".";
import firebase from "firebase/compat/app";
import { actionTypes } from "./reducer";
import db, { auth } from "./firebase";
const ChattingRoom=(props)=>{
    const [input,setinput]=useState("");
    const {id}=useParams();
    const [mssg,Setmssg]=useState([]);
    const [roomName,setroomName]=useState("");
    const [{ photo}]=useStateValue();
    const [{user},dispatch]=useStateValue();
    const [{Display}]=useStateValue()
    useEffect(()=>{
       if(id){
           db.collection('Room').doc(id).onSnapshot((res)=>{setroomName(res.data().name)});
           db.collection('Room').doc(id).collection('mssg').orderBy('timestamp','asc').onSnapshot(
               res=>(Setmssg(res.docs.map(doc=>doc.data()))));
       }
    },[id])
    const sendmssg=(e)=>{
  e.preventDefault();
  if(input.length===0){
      alert("empty message cant be send");
      return;
  }
  console.log(input);
  db.collection('Room').doc(id).collection('mssg').add({
      message:input,
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  })
  setinput('');
    }
    const handlesignout=()=>{
        auth.signOut().then(()=>{
            dispatch({
                type:actionTypes.SET_USER_OUT,
                user:null
            })
        console.log("signout");
        })
    }
    return(
        
        <Wrapper className={!Display?"shown":"Shown"}>
            <Navbar>
            {Display && <img src="https://cdn-icons-png.flaticon.com/128/60/60972.png" className="arrow" onClick={()=>{dispatch(
                  {
                    type:actionTypes.SET_DISPLAY,
                    Display:false
                  }
              )}}/>}
            
            <div>
                <h3 style={{margin:0}}>{roomName}</h3>
                <p style={{margin:0}}>{new Date(
                    mssg[mssg.length-1]?.
                    timestamp?.toDate())
                    .toUTCString().substring(17,22)
                }</p>
                </div>
           <Menu ><div></div>
               <div></div>
               <div></div>
               <span onClick={()=>{handlesignout()}}>Sign Out</span></Menu>
            </Navbar>
            <ChatContainer>  
                {
                    mssg.map((message)=>( <Message className={message.name!==user.displayName ?"NotUser":"User"}>
                       {message.name!==user.displayName&& <span>{message.name} :</span>}
                        <p >{message.message} <Time>{new Date(message.timestamp?.toDate()).toUTCString().substring(17,25)}</Time> </p>
                        
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
// background-color:blue;

// @media (max-width:680px){
//     display:none;
// }
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
  
}`;
const Navbar=styled.div`
height:100px;
display:flex;
align-items:center;
justify-content:end;
background-color:whitesmoke;
border-bottom:2px solid grey;
cursor:pointer;
img{
    margin-right:10px;
    // height:50px;
    border-radius:50%;
}
min-width:100px;
${Menu}{
    &: hover{
     span{
         width:fit-content;
         color:white;
        opacity:1;
        transition-duration:1s;
     }
    }
}
span{
    position:absolute;
    top:100px;
    right:0px;
    width:100px;
    background:rgb(19,19,19);
    border:1px solid rgba(151,151,151,0.34);
    box-shadow:rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    border-radius:5px;
    padding:10px;
    font-size:14px;
    letter-spacing:3px;
    opacity:0;
}
`;
const ChatContainer=styled.div`
flex:1;
// background-image:url("https://imgs.search.brave.com/PQ2lzfvMadqRpMHLTAGxyCHzRTIT5sS2vKnWHU2QAk0/rs:fit:750:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQ0MTA3/MjEuanBn");
// background-repeat:repeat;
// background-position:center;
background-color:whitesmoke;

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
width:100%;
form{

    display:flex;
    align-items:center;
    width:100%;
input{
    width:100%;
    font-size:20px;
    border-radius:30px;
    height:60px;
    margin-left:10px;
    padding:5px;
    @media (max-width:680px) {
        width:fit-content;
    }
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
const Time=styled.span`
`;

const Message=styled.div`

display:flex;
flex-direction:column;
font-size:1rem;
// margin-left:0px;
border:0px;
align-items:start;
// height:70px;
width:fit-content;
padding:10px;
p{
// position:absolute;
// width:fit-content;
margin:0px;
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