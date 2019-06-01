
/***
     * description: define the global state of lead
     
    */
const initialState = {
        isLoading: false, //has the search already stopped ??
        isSearchingMore: false, // is it still searching more leads?
        foundEmails: [],
        isShowmore: false,
        p:0

};

/***
     * description: 
     * params: 
     * return: 
    */

  export default function leadSearch (state = initialState, action){

    switch (action.type) {
       
        case 'LEAD_IS_LOADING':
          return {...state, foundEmails: [], isLoading: true};

        case 'LEAD_LOADED':
          return {...state, foundEmails: action.data, isLoading: false};

        case 'LEAD_SHOW_MORE':
          return {...state, foundEmails: action.data, isLoading: false, isSearchingMore: true, isShowmore: true, p: 10};
        case 'LEAD_SHOW_MORE_<_10':
          return {...state, foundEmails: state.foundEmails.concat(action.data), isLoading: false, isSearchingMore: false, isShowmore: true};

          default:
            return state; 
    }
  }
  