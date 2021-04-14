import _ from 'lodash';
import jsonplaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async dispatch => {
    const response = await jsonplaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

// _ indicates that, it is a private function
const _fetchUser = _.memoize(async(id, dispatch) => {
    const response = await jsonplaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
});


/*export const fetchUser = function (id) { 
    return _.memoize(async function (dispatch)  {
        const response = await jsonplaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
    });
};*/
