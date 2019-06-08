
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
    };

/***
     * description: take the initial state and set the new state for each action
     * params: state, action
     * return: state
    */

  export default function leadSearch (state = initialState, action){
 
    switch (action.type) {
        
      case 'INIT':
          console.log("INITIALIZE")
        return {...state, isLoading: false, user: action.user, foundEmails: [] ,shouldWeDisplayTable: false, p:0};

      case 'FETCH_LOADING':
          
        return {...state, isLoading: true, isSearchingMore: true, user: action.user};

      case 'HIDE_SHOW_MORE_BTN':
          
        return {...state, isShowmore: true};

      case 'FETCH_CHECK_PIXEL': 
          let mostRecentEmails = state.foundEmails;
          mostRecentEmails.map(elt =>{
            if(elt.Domain == action.data.data.domain){
              elt.hasFacebookPixel = action.data.data.hasFacebookPixel;
              elt.hasGooglePixel = action.data.data.hasGooglePixel;
            }
          })
          
        return {...state, foundEmails: mostRecentEmails, isSearchingMore: true, isShowmore: true};

      case 'FETCH_SHOW_MORE':
          
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false,  isSearchingMore: false, isShowmore: true, p: state.p + 10, shouldWeDisplayTable: true};
    
      case 'FETCH_SHOW_MORE_<_10':
          
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p, shouldWeDisplayTable: true};

      case 'FETCH_FORFAIT_FINISHED':
          
        return {...state, user: action.user, foundEmails: (state.foundEmails.concat(action.data)), forfaitFinished: action.forfaitFinished};

      case 'FETCH_ERROR':
          
        return {...state, user: action.user, err: action.error , isLoading: false, isSearchingMore: false, isShowmore: false, p: state.p};

        default:
            
          return state; 
  }

  }
  