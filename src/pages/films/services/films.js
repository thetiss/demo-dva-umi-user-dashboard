/*
 * @Author: hiyan 
 * @Date: 2020-10-28 14:16:55 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-29 16:44:23
 */
import request from '../../../utils/request'
import { PAGE_SIZE } from '../constants'

export function fetch({ page=1 }) {
    console.log("*****request*****");
    return request(`/save/films?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function deleteFilm(id) {
    return request(`/save/films/${id}`,{
        method: 'DELETE',
    });
}

export function editFilm(id,values){
    return request(`/save/films/${id}`,{
        method:'PATCH',
        body:JSON.stringify(values),
    });
}

export function createFilm(values){
    return request(`/save/users`,{
        method:'POST',
        body:JSON.stringify(values),
    })
}