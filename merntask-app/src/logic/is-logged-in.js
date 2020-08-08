import { authToken } from '.'

export default (function () {
    return !!this.token

}).bind(authToken)