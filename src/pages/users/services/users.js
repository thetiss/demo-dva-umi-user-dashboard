/*
 * @Author: hiyan 
 * @Date: 2020-10-27 16:16:46 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-28 17:08:47
 */
import request from '../../../utils/request';
import { PAGE_SIZE } from '../constants'

export function fetch({ page = 1 }){
    console.log("*****request*****");
    return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}