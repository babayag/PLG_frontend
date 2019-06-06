
/***
     * description: define the global state of lead
     
    */
const initialState = {

        user: '',
        isLoading: false, //has the search already stopped ??
        isSearchingMore: false, // is it still searching more leads?
        forfaitFinished: '',
        foundEmails: [],
        isShowmore: false,
        shouldWeDisplayTable: false,
        p:0,
        error: {},
        Actions: []
    };

/***
     * description: take the initial state and set the new state for each action
     * params: state, action
     * return: state
    */

  export default function leadSearch (state = initialState, action){
 
    switch (action.type) {
        
      case 'FETCH_INITIALIZE':
          console.log("INITIALIZE")
        return {...state, user: action.user, foundEmails: ([].concat(action.data)) ,shouldWeDisplayTable: true};

      case 'FETCH_LOADING':
          console.log(state)
        return {...state, isLoading: true, user: action.user, Actions: state.Actions.concat(action.type)};

      case 'FETCH_SHOW_MORE':
          console.log(state)
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false,  isSearchingMore: false, isShowmore: true, p: state.p + 10, shouldWeDisplayTable: true, Actions: state.Actions.concat(action.type)};
    
      case 'FETCH_SHOW_MORE_<_10':
          console.log(state)
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p, shouldWeDisplayTable: true, 
          Actions: state.Actions.concat(action.type)};

      case 'FETCH_FORFAIT_FINISHED':
          console.log(state)
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), forfaitFinished: action.forfaitFinished, Actions: state.Actions.concat(action.type)};

      case 'FETCH_ERROR':
          console.log(state)
        return {...state, user: action.user, err: action.error , isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p, shouldWeDisplayTable: false, Actions: state.Actions.concat(action.type)};

        default:
            console.log(state)
          return state; 
  }

  }
  