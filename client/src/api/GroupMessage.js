import { ENV } from '../utils';

export class GroupMessage {
    async getTotal(accessToken, groupId) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.GROUP_MESSAGE_TOTAL }/${ groupId }`;
            const params = {
                headers: {
                    Authorization: `Bearer ${ accessToken }`
                }
            };

            const response = await fetch(url, params);
            const result = response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (e) {
            throw e;
        }
    }

    async getLastMessage(accessToken, groupId) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.GROUP_MESSAGE_LAST }/${ groupId }`;
            const params = {
                headers: {
                    Authorization: `Bearer ${ accessToken }`
                }
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (e) {
            throw e;
        }
    }
}
