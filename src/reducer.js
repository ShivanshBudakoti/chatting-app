export const initialState={
    user:null,
    photo:null,
   Display:false
};
export const actionTypes={
    SET_USER:"SET_USER",
    SET_DISPLAY:"SET_DISPLAY"
};
const reducer=(state,action)=>{
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user:action.user,
             photo:action.user.photoURL
            };
        case actionTypes.SET_DISPLAY:
            return{
                ...state,
                Display:action.Display
            }    
            default:return state;
    }
};
export default reducer;