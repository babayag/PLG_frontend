
/***
     * description: define the global state of lead
     
    */
const initialState = {
        isLoading: false, //has the search already stopped ??
        isSearchingMore: false, // is it still searching more leads?
        foundEmails: [],
        isShowmore: false,
        shouldWeDisplayTable: false,
        p:0,
        error: {}
    };

/***
     * description: take the initial state and set the new state for each action
     * params: state, action
     * return: state
    */

  export default function leadSearch (state = initialState, action){
 
    switch (action.type) {
       
        case 'FETCH_INITIALIZE':
          return {...state};
        case 'FETCH_LOADING':
          return {...state, isLoading: true, isSearchingMore: true, isShowmore: false, shouldWeDisplayTable: false};

        case 'FETCH_SHOW_MORE':
          return {...state, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false,  isSearchingMore: false, isShowmore: true, p: state.p + 10, shouldWeDisplayTable: true};
      
        case 'FETCH_SHOW_MORE_<_10':
          return {...state, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p, shouldWeDisplayTable: true};

        case 'FETCH_ERROR':
          return {...state, err: action.error , isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p, shouldWeDisplayTable: false};

          default:
            return state; 
    }

  }
  