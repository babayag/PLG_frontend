export let usercredentials = {
    USERTOKEN : localStorage.getItem('token') ? localStorage.getItem('token') : null,
    USER_AUTHENTICATE : localStorage.getItem('user_authanticate') ?  localStorage.getItem('user_authanticate') : null,
}
