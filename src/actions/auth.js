let DevUrlPRoduction = "/api/lead/auth/users/me/";
export const loadUser = () => {
    return (dispatch, getState) => {
      dispatch({type: "USER_LOADING"});

      const token = getState().auth.token;
      let headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }
      let devLocalUrl = "/api/lead/auth/users/me/"
      let Devurl = "/api/lead/auth/users/me/";
      return fetch(Devurl, {headers, })
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'USER_LOADED', user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const login = (email, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({email, password});

      return fetch("/api/lead/auth/jwt/create/", {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            let Idata = res.data;
            Idata.user = { "email" : email };
            console.log(Idata);
            dispatch({type: 'LOGIN_SUCCESSFUL', data: Idata });
            return Idata;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "LOGIN_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const register = (email, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({email, password});

      return fetch("/api/lead/auth/users/create/", {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "REGISTRATION_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }
