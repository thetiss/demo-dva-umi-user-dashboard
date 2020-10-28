/*
 * @Author: hiyan 
 * @Date: 2020-10-27 15:39:20 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-28 17:21:02
 */
import * as usersService from "../services/users";

export default {
    namespace: 'users',//对应 reducer 在 combine 到 rootReducer 时的 key 值
    state: {
        list: [],
        total: null,
    },
    reducers: {
        save(state, {payload: { data:list,total}}) { // 返回全部数据
            console.log("***********reducers==state,list,total************");
            console.log(state);
            console.log(list);
            console.log(total);
            return {...state, list, total};
        },
    },
    effects: { // similar to redux-saga action_creator_func
        *fetch({ payload: { page }},{ call, put }){
            console.log("****effects==fetch*****");            
            const { data, headers } = yield call(usersService.fetch,{ page });
            console.log("****after call*****");
            console.log(data);
            console.log(headers);
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