export default {
    set token(token) {
        sessionStorage.token = token
    },

    get token() {
        return sessionStorage.token
    },

    clear() {
        sessionStorage.clear()
    }

}





// en caso de hacerlo con axios se puede hacer de la siguiente manera:

// import clienteAxios from './axios'

// const tokenAuth = token => {
//     if (token) {
//         clienteAxios.defaults.headers.common['x-auth-token'] = token
//     } else {
//         delete clienteAxios.defaults.headers.common['x-auth-token'] 

//     }
// }
// export default tokenAuth


// (esta función coloca el token en los headers)