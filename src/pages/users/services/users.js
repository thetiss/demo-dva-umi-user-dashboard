/*
 * @Author: hiyan 
 * @Date: 2020-10-27 16:16:46 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-27 17:39:56
 */
import request from '../../../utils/request';

export function fetch({ page = 1 }){
    return request(`/api/users?_page=${page}&_limit=5`);
}