const initialState = {
    numberOfRequest : "",
    isNumberRequestLoad: false,
}

export default function requestNumbers(state=initialState, action) {

    switch (action.type) {
        
        case 'LOAD_REST_OF_REQUEST':
            return {...state, numberOfRequest : action.numberOfRequest , isNumberRequestLoad : true };
  
        default:
            return state;
    }
  }



