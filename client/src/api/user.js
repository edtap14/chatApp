import { ENV } from '../utils';

export class User {
    async getMe(accessToken) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER.GETME }`;
            const params = {
                headers: {
                    Authorization: `Bearer ${ accessToken }`
                }
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (result.status === 400) throw result;
            return result;
        } catch (e) {
            throw e;
        }
    }

    async updateUser(accessToken, userData) {
        try {
            const data = userData;

            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                formData.append(key, data[ key ]);
            });

            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER.GETME }`;
            const params = {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${ accessToken }`,
                },
                body: formData
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (e) {
            throw e;
        }
    }

    async getAll(accessToken) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER.USER }`;
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

    async getUser(accessToken, userId) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER.USER }/${ userId }`;
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

    async getUsserExeptParticipantsGroup(accessToken, groupId) {
        try {
            const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER.USER_EXCEPT_PARTICIPANTS_GROUP }/${ groupId }`;
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
}
