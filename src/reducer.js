export const initialState={
    user:null,
    photo:null,
    
};
export const actionTypes={
    SET_USER:"SET_USER",
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
            default:return state;
    }
};
export default reducer;