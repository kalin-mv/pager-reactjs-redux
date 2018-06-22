import _ from 'lodash';
import { delay } from 'redux-saga';
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../actions';

const { user } = actions;

function* request(action, apiFn, data) {
    yield put( action.request(data) );
    const {response, error} = yield call(apiFn, data);
    if(response) {
        yield put( action.success(data, response) );
    } else {
        yield put( action.failure(data, error) );
    }
    return { response, error };
}

const readUser = request.bind(null, user.READ, api.fetchUser);

function* loadUsers(page, per_page) {
    const users = yield select(state => state.entities.users);
    if (!users || _.keys(users).length <= 0) {
        yield call(readUser, { page, per_page });
    }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchIndexPage() {
    while(true) {
        yield take(actions.LOAD_INDEX_PAGE);
        yield delay(3000);
        const pager = yield select(state => state.pagination.get('users'));
        const page = pager.get('page');
        const per_page = pager.get('per_page');
        yield fork(loadUsers, page, per_page);
    }
}

function* watchNextUsers() {
    while(true) {
        const {page, perPage } = yield take(actions.LOAD_NEXT_USERS);
        yield delay(3000);
        yield fork(loadUsers, page, perPage);
    }
}

export default function* root() {
    yield all([
        fork(watchIndexPage),
        fork(watchNextUsers),
    ]);
}
  