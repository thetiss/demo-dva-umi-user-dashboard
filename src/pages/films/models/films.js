/*
 * @Author: hiyan 
 * @Date: 2020-10-28 14:19:31 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-28 17:29:01
 */
import * as filmService from "../services/films"

export default {
    namespace: 'films',
    state: {
        list: [],
        total: null,
        // page: null,
    },
    reducers: {
        save(state,{ payload: { data: list, total }}) {
            console.log("***reducers***");
            return { ...state, list, total }
        }
    },
    effects: {
        *fetch({ payload: { page }}, { call, put }){
            console.log("****effects==fetch*****");   
            // 由于yield call(filmService.fetch(), { page })导致调试了近1个小时的bug
            // const { data, headers } = yield call(filmService.fetch, { page });        
            const { data, headers } = yield call(filmService.fetch, { page });
            console.log(data);
            console.log("****after call*****");
            console.log(data);
            console.log(headers);
            yield put({ 
                type: 'save', 
                payload: {
                  data,
                  total: headers['x-total-count'],
                  page: page,
                //   total: parseInt(headers['x-total-count']),
                //   page: parseInt(page),      
            }})

        }
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({ pathname, query }) => {
                console.log("*****subscriptions*******");
                console.log("***pathname",pathname);
                console.log("***query",query);
                if(pathname === '/films'){
                    dispatch({ type:'fetch', payload: query})
                }
            })
        }
    }

}