import 'core-js/stable/atob';
import { jwtDecode } from 'jwt-decode';

export function hasExpiredToken(token) {

    const { exp } = jwtDecode(token);
    const currenData = new Date().getDate();

    if (exp <= currenData) {
        return true;
    }
    return false;
}
