import _ from 'lodash';

import { FETCH_RESERVATIONS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_RESERVATIONS:
        return _.mapKeys(action.payload.data, 'id');
    default:
        return state;s
    }
}
