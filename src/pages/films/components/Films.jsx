/*
 * @Author: hiyan 
 * @Date: 2020-10-28 14:06:41 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-28 17:06:56
 */
import React from 'react';
import { connect } from 'dva'
import { Table, Popconfirm, Button, Pagination } from 'antd'
import { routerRedux }  from 'dva/router'
import { PAGE_SIZE } from '../../users/constants';


const Films = ({ list: dataSource, loading, dispatch, page: current, total,  }) => {
    const pageChangeHandler = (page) => {
        dispatch(routerRedux.push({
            pathname: '/films',
            query: { page },
        }))
    }
    const columns = [
        {
            title:'ID',
            dataIndex:'id',
            key: 'id',
        },       
        {
            title:'电影名',
            dataIndex:'title',
            key: 'title',
        },        
        {
            title:'导演',
            dataIndex:'director',
            key: 'director',
        },       
        {
            title:'出品',
            dataIndex:'producer',
            key: 'producer',
        },        {
            title:'上映时间',
            dataIndex:'release_date',
            key: 'release_date',
        },       
        {
            title:'评分',
            dataIndex:'rt_score',
            key: 'rt_score',
        },        
        {
            title:'链接',
            dataIndex:'url',
            key: 'url',
        },
    ]
    return(
        <div>
            <h2>Show films,fetch data from <a href="https://ghibliapi.herokuapp.com/films">Api</a></h2>
            <Table 
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
            />
            <Pagination 
                total={total}
                current={current}
                pageSize={PAGE_SIZE}
                onChange={(page) => pageChangeHandler(page)}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    const { list, page, total, } = state.films;
    console.log("****mapStateToProps*****");
    console.log(page);
    return {
        list,
        page,
        total,
        loading: state.loading.models.films,
    };
}
export default connect(mapStateToProps) (Films)