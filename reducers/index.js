import * as ActionTypes from '../actions';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

const initialEntitiesState = fromJS({
    users: {},
});

const initialPagerState = fromJS({
    users: {
        page: 1,
        per_page: 4,
        total: 0,
        total_pages: 0,
    },
});

function entities(state = initialEntitiesState, action) {
    if (action.response && action.response.entities) {
        const { response: { entities } } = action;
        if (action.hasOwnProperty('meta') && action.meta.method === ActionTypes.DELETE) {
            let list = state.get(action.meta.entity);
            action.data.map(id => list = list.remove(id));
            state = state.set(action.meta.entity, list);
        } else {
            state = state.mergeDeep(entities);    
        }
    }
    return state;
}

function errorMessage(state = null, action) {
    const { type, error } = action;
    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return action.error;
    }
    return state;
}

function pagination(state = initialPagerState, action) {
    if (action.response && action.response.pager) {
        const { response: { pager } } = action;
        if (action.hasOwnProperty('meta')) {
            let pagination = state.get(action.meta.entity);
            pagination = pagination.merge(pager);   
            state = state.set(action.meta.entity, pagination); 
        }
    }
    return state;
}

const rootReducer = combineReducers({
    entities,
    pagination,
    errorMessage,
});

export default rootReducer;