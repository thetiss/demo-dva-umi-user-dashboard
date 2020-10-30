/*
 * @Author: hiyan 
 * @Date: 2020-10-28 14:19:31 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-29 16:49:48
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
                //   total: headers['x-total-count'],
                //   page: page,
                  total: parseInt(headers['x-total-count']),
                  page: parseInt(page),      
            }})
        },
        // *remove({ payload: id }, { call, put, select }) {
        //     yield call(usersService.remove, id);
        //     const page = yield select(state => state.users.page);
        //     yield put({ type: 'fetch', payload: { page } });
        //   },
        *delete({ payload: { id:id }},{ call, select, put }){
            yield call(filmService.deleteFilm, id);
            const page  = yield select(state => state.films.page);            
            yield put({
                type: 'fetch',
                payload:{ page }
            })
        },        
        *edit({ payload: { id, values }},{ call, select, put }){
            yield call(filmService.editFilm, id,values);
            const page  = yield select(state => state.films.page);            
            yield put({
                type: 'fetch',
                payload:{ page }
            })
        },        
        *create({ payload: { values }},{ call, select, put }){
            yield call(filmService.createFilm, values);
            const page  = yield select(state => state.films.page);            
            yield put({
                type: 'fetch',
                payload:{ page }
            })
        },
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