import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from ".";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useNavigate } from "react-router-dom";
function Login(props){
    const[{},dispatch]=useStateValue();
     const [login,setlogin]=useState(false)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');

    // const [User,setUser]=useState('');
    const history = useNavigate();

    const [ConfirmPassword,setConfirmPassword]=useState('');
    const signIn=()=>{
    auth.signInWithPopup(provider).then((res)=>{
        dispatch({
            type:actionTypes.SET_USER,
            user:res.user
        })
    }).catch((err)=>{alert(err)})
    }
    
function handleSignup(e){
    e.preventDefault();

    if ( password!==ConfirmPassword){
      alert("password does'nt match");
      return;
    }
        auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log(userCredential);

            // // Signed in 
            console.log(userCredential)
            // ...
            dispatch({
                type:actionTypes.SET_USER,
                user:userCredential.user
            })
            dispatch({
                type:actionTypes.SET_USERNAME,
                Username:username
            })  
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            // ..
          })
      
          history('/');
}
const authListener=()=>{
    auth.onAuthStateChanged((user)=>{
        if(user){
             // ...
             dispatch({
                type:actionTypes.SET_USER,
                user:user
            })
            // var displayName = user.displayName;
            // var email = user.email;
         // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
        }
    })
}
useEffect(()=>{
    authListener();
    history('/');

},[])
function handleLogin (e){
    e.preventDefault();
    console.log(email);
    
auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // setUser(User);
    console.log(userCredential);

    // Signed in
    dispatch({
        type:actionTypes.SET_USER,
        user:userCredential.user
    })
    // // ...
    history('./');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);
  })
}
    // useEffect(()=>{
    //     const changefalse=()=>{
    //         login=false;
    //     }
    //     const changetrue=()=>{
    //         login=true;
    //     }
    // })
    // const changefalse=()=>{
    //             login=false;
                
    //         }
    // const changetrue=()=>{
    //             login=true;
    //         }
   
    return(
        <Wrapper>
            <Navbar>
            {
                login ?
                <button onClick={()=>{setlogin(false)}}>Sign Up</button>:
                <button onClick={()=>{setlogin(true)}}>Sign In</button>
            }
            </Navbar>
            <Container>
            { 
            login?
            <>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
             <span>Email:</span>
             <input type="email" onChange={(e)=>setEmail(e.target.value)}></input>
             <span>Password:</span>
             <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
             <button type="submit">Submit</button>

            </form> 
            <div>
            <button onClick={signIn}> <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png"/><span>signIn with Goggle</span></button>

            
            </div>
            {console.log(login)}
            </>
            :<>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignup}>
              <span>UserName</span>  
              <input type="text" onChange={(e)=>setUsername(e.target.value)}></input>
             <span>Email Id:</span>
             <input type="email" onChange={(e)=>setEmail(e.target.value)}></input>
             <span>Password:</span>
             <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
             <span>confirm Password:</span>
             <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)}></input>
             <button type="submit">Submit</button>
            </form>
            <div>
           <button onClick={signIn}> <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png"/><span>signUp with Goggle</span></button>
            </div>
            {console.log(login)}

            </>
}         
            </Container>
           <Bgimage/>
        </Wrapper>
    )
}
const Wrapper=styled.div`
height:100%;
width:100%;
 position:relative;
 top:60px;
// justify-content:center;
// align-items:center;
background-color:rgb(4,45,101);

margin:auto;

`;
const Container=styled.div`
flex:1;
display:flex;
height:550px;
width:330px;
justify-content:space-around;
flex-direction:column;
align-items:center;
border:2px solid white;
box-shadow:rgb(0 0 0 / 80%) 0px 40px 59px -16px,
rgb(0 0 0 / 72%) 0px 30px 22px -10px;
border-radius:10px;
// background-color:rgba(4,45,101,255);
// background-color: rgb(3, 2, 43);
// position:absolute;

margin:auto;
h1{
    position:relative;
    top:-10px;
    cursor:pointer;
    color:white;
    border:2px solid white;
    border-radius:10px;
    padding:10px;
    letter-spacing:1.2px;
}
button{
    font-size:20px;
    letter-spacing:1.2px;
    cursor:pointer;
    background-color:transparent;
    color:white;
    border-radius:10px;
    padding:10px;
    width:fit-content;
}
form{
    color:white;
    display:flex;
    flex-direction:column;
    flex:0.8;
    position:relative;
    letter-spacing:1.2px;
    text-transform:uppercase;
    top:-40px;
    & :nth-child(odd){
        margin-top:10px;
    }
    
    input{
        border:none;
      height:20px;
      font-size:20px;
       padding-top:10px;
       padding-bottom:10px;
    }
}
button{
    margin:auto;
    height:70px;
    width:fit-content;
   display:flex;
   align-items:center;
    &:hover{
        box-shadow:rgb(0 0 0 / 70%) 0px 26px 30px -10px,
        rgb(0 0 0 / 72%) 0px 15px 10px -10px;
    }
    img{
        height:40px;
        width:40px;
        margin-left:auto;
        border-radius:10px;
        padding:2px;
    }
    span{
        margin-left:7px;
    }
    
}
div{
    width:100%;
    display:flex;
    justify-content:space-around;
}
}
`;
// const Bgimage=styled.div`
// height:100%;
// background-position:top;
// background-size:100% 100%;
// background-repeat:no-repeat;
// background-image:url('https://img.freepik.com/free-vector/group-chat-concept-illustration_114360-1495.jpg?size=626&ext=jpg');
// position:absolute;
// top:100px;
// right:0;
// left:0;
// z-index:-1;
// position:absolute;
// `;
const Bgimage=styled.div`
height:100%;
background-position:top;
background-size:100% 100%;
background-repeat:no-repeat;
background-image: url("/public/image/home-background.png");
z-index:-1;
position:absolute;
top:100px;
top:100px;
right:0;
left:0;
`;
const Navbar=styled.div`
button{
    font-size:15px;
    letter-spacing:1.2px;
    cursor:pointer;
    background-color:transparent;
    color:white;
    border-radius:10px;
    padding:10px;
    width:100px;
    position:relative;
    top:-60px;
    &:hover{
        box-shadow:rgb(0 0 0 / 70%) 0px 26px 30px -10px,
        rgb(0 0 0 / 72%) 0px 15px 10px -10px;
    }
}
display:flex;
justify-content:end;
width:90vw;
`;
 export  default Login;