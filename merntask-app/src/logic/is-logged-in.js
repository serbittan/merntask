import authToken from './auth-token'

export default (function () {
    return !!this.token

}).bind(authToken)