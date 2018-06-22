import _ from 'lodash';
import { schema, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

function callApi(endpoint, schema, method, data = {}) {
    const fullUrl = endpoint;
    let body = null;
    if (method !== 'GET') {
        body = {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }
    return fetch(fullUrl, body)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json }) => {
            let data = json, pager = {};
            if (json.hasOwnProperty('data')) {
                data = json.data;
                pager = _.pickBy(json, (v, k) => k !== 'data');
            }
            const camelizedJson = camelizeKeys(data);
            const result = {...normalize(camelizedJson, schema), pager };
            return result;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        );
}
const userSchema = new schema.Entity('users', {
    idAttribute: 'id'
});

export const fetchUser = ({page, per_page}) => callApi(`https:/reqres.in/api/users?page=${page}&per_page=${per_page}`, [userSchema], 'GET');
