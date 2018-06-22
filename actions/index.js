import _ from 'lodash';

/*
 * action types
 */
export const LOAD_INDEX_PAGE = 'LOAD_INDEX_PAGE';
export const LOAD_NEXT_USERS = 'LOAD_NEXT_USERS';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const CREATE = 'CREATE';
export const READ   = 'READ';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function action(type, payload = {}) {
    return {type, ...payload};
}

function createEntityRequest(name) {
    return [CREATE, READ, UPDATE, DELETE].reduce((acc, method) => {
        const pref = `${_.upperCase(name)}_${method}`;
        const meta = { entity: _.lowerCase(name), method };
        acc[method] = {
            request: (data) => action(`${pref}_${REQUEST}`, { meta, data } ),
            success: (data, response) => action(`${pref}_${SUCCESS}`, { meta, data, response } ),
            failure: (data, error) => action(`${pref}_${FAILURE}`, { meta, data, error }),
        };
        return acc;
    }, {});
}
export const user = createEntityRequest('users');

export const loadIndexPage = () => action(LOAD_INDEX_PAGE, {});
export const loadNextUsers = (page, perPage) => action(LOAD_NEXT_USERS, {page, perPage});