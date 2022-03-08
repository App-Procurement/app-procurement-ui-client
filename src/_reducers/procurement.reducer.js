
export function procurement(state = {}, action) {
    return {
        ...state,
        ...action.data
    }
}