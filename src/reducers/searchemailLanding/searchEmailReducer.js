

// description : objet contain value of initial global state of search email.
const initialState = { 
  isAboutVisible: false,
  emails : [],
  isload : false,
  message :"",
  latestSearch: "",
  valueOfp: 0, 
    error:{}
};

/* 
* description : the method get state and action to update global state of search email.
* params : url,p
* return : new value  to add and previous value of global state for each case of type action
*/

export default function toggleSearchEmail(state=initialState, action) {
    switch (action.type) {
      case "FETCH_EMAILS" : 
        return {...state, emails : state.emails.concat(action.emails.data[0]), valueOfp : action.emails.data[1], isload : false, isAboutVisible:true }
      case "EMAIL_IS_LOADING" :
        return {...state, isload: true };
      case "FETCH_SEEMORE" :
        console.log(action.emails.data[0]);
        return {...state, emails : state.emails.concat(action.emails.data[0]), valueOfp : action.emails.data[1], isload : false, isAboutVisible:true }
      case "FETCH_REFRESHSTATE" :
        return {...state, emails : []};
      default:
        return state
    }
  }

