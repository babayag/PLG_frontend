
/***
     * description: define the global state of lead
     
    */
const initialState = {
        isLoading: false, //has the search already stopped ??
        isSearchingMore: false, // is it still searching more leads?
        foundEmails: [],
        isShowmore: false,
        p:0,
        error: {}
};

/***
     * description: 
     * params: 
     * return: 
    */

  export default function leadSearch (state = initialState, action){
  let nextState;

 
    switch (action.type) {
       
        case 'LEAD_IS_LOADING':
          return {...state, isLoading: true, isSearchingMore: true, isShowmore: false};

        case 'LEAD_SHOW_MORE':
          return {...state, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false,  isSearchingMore: false, isShowmore: true, p: state.p + 10  };
      
        case 'LEAD_SHOW_MORE_<_10':
          return {...state, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p};

        case 'ERROR':
          return {...state, err: action.error , isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p};

          default:
            return state; 
    }

  }
  