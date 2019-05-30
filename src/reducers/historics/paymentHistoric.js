const initialState = {
    isPaymentHistoricLoaded : false,
    payments : [],
}

/**
 * description: get payments historic. 
 * params: state, action
 *  return: state
 */
export default function paymentHistoric(state=initialState, action) {

    switch (action.type) {
        
        case 'FETCH_PAYMENTS_HISTORIC':
            return {...state, payments : action.payments , isPaymentHistoricLoaded : true };
  
        default:
            return state;
    }
}