export const initialState={
    user:null,
    photo:null,
   Display:false,
   Username:null
};
export const actionTypes={
    SET_USER:"SET_USER",
    SET_DISPLAY:"SET_DISPLAY",
    SET_USER_OUT:"SET_USER_OUT",
    SET_USERNAME:"SET_USERNAME"
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
        case actionTypes.SET_USER_OUT:
                return{
                    ...state,
                    user:null,
                 photo:null
                };      
        case actionTypes.SET_USERNAME:
                    return{
                        ...state,
                      Username:action.Username
                    };        
            default:return state;
    }
};
export default reducer;