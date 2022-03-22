 export const account = (state = {}, action) =>{
    return {
        ...state,
        ...action.Data
    }
}
