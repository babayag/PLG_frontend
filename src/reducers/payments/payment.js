const initialState = {
    paymenturl : "",
    forfaits : [],
}

export default function forfaits(state=initialState, action) {

    switch (action.type) {
        
        case 'MAKE_PAYMENT_FORFAIT':
            return {...state, forfaits : action.forfaits , isForfaitLoading : false };
        case 'EXECUTE_PAYEMENT_FORFAIT':
        default:
            return state;
    }
  }





