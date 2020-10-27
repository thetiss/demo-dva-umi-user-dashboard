/*
 * @Author: hiyan 
 * @Date: 2020-10-27 15:39:20 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-27 18:03:01
 */
import * as usersService from "../services/users";

export default {
    namespace: 'users',//对应 reducer 在 combine 到 rootReducer 时的 key 值
    state: {
        list: [],
        total: null,
    },
    reducers: {
        save(state, {payload: { data:list,total}}) {
            return {...state, list, total};
        },
    },
    effects: { // similar to redux-saga action_creator_func
        *fetch({ payload: { page }},{ call, put }){
            const { data, headers } = yield call(usersService.fetch,{ page });
            yield put({ type: 'save', payload: { data, total: headers['x-total-count']} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({ pathname, query }) => {
                if(pathname === '/users') {
                    dispatch({ type: 'fetch',payload: query });
                }
            });
        },
    },
}