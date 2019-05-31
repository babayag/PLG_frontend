const initialState = {
    isForfaitLoading : true,
    forfaits : [],
}

export default function forfaits(state=initialState, action) {

    switch (action.type) {
        
        case 'FETCH_FORFAIT':
            return {...state, forfaits : action.forfaits , isForfaitLoading : false };
  
        default:
            return state;
    }
}