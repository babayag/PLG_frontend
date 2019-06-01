/***
     * description: define initial state of searchList, error, searchIsLoad
       */
const initialState = {
    searchList: [],
    error:{},
    searchIsLoad : false
};

/***
     * description: sets state according to different actions
     * params: state, action
     * return: global state
    */
  export default function recentSearch (state = initialState, action){

    switch (action.type) {
        case 'RECENT_SEARCH_LOADING':
           return {...state, searchIsLoad : false};

        case 'RECENT_SEARCH_LOADED':
          return {...state, searchList: action.searchList, searchIsLoad : true};

        case 'RECENT_SEARCH_ERROR':
          return {...state, error: action.error, searchIsLoad : false};

          default:
            return state; 
    }
  }
