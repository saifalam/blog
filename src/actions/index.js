import _ from 'lodash';
import jsonplaceholder from '../apis/jsonPlaceholder';


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));

    //-------- Chain version to get unique userId with less netwoek call  --------
    /* _.chain(getState().posts)
         .map('userId')
         .uniq()
         .forEach(id => dispatch(fetchUser(id)))
         .value();*/
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonplaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

// -------- Normal version of fetchUser --------
export const fetchUser = (id) => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

//-------  _.memoize version of fetchUser  --------
/*
export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

// _ indicates that, it is a private function
const _fetchUser = _.memoize(async(id, dispatch) => {
    const response = await jsonplaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
});*/


/*export const fetchUser = function (id) {
    return _.memoize(async function (dispatch)  {
        const response = await jsonplaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
    });
};*/

