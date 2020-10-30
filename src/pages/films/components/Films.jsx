/*
 * @Author: hiyan 
 * @Date: 2020-10-28 14:06:41 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-30 11:16:40
 */
import React,{ useState } from 'react';
import { connect } from 'dva'
import { Table, Popconfirm, Button, Pagination } from 'antd'
import { routerRedux }  from 'dva/router'
import { PAGE_SIZE } from '../../users/constants';
import FilmInfoModal from './FilmModal'


const Films = ({ list: dataSource, loading, dispatch, page: current, total,  }) => {
    const [visible,setVisible]=useState(false);
    const onCancel = () => {
        setVisible(false);
    }
    const onCreate = (values) => {
        console.log("***Films onCreate values is*****",values);
        setVisible(false);
    }

    const pageChangeHandler = (page) => {
        dispatch(routerRedux.push({
            pathname: '/films',
            query: { page },
        }))
    }

    const deleteFilmById = (id) => {
        dispatch({
            type:'films/delete',
            payload:{id: id}
        })
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
            title:'操作',
            dataIndex:'',
            key: '',
            render: (text,record) => (
                <div>
                    <Popconfirm title="确认删除吗？" onConfirm={() => deleteFilmById(record.id)} okText="确认" cancelText="取消">
                        <a href="">删除</a>
                    </Popconfirm>
                    <span>      </span>
                    <Button type="text" >编辑</Button>
                </div>
            )
        },
    ]
    return(
        <div>
            <h2>Show films,fetch data from <a href="https://ghibliapi.herokuapp.com/films">Api</a></h2>
            <Button onClick={()=>{setVisible(true)}}>上新电影</Button>
            <FilmInfoModal visible={visible} onCancel={onCancel} onCreate={onCreate} />
            <Table 
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.id}
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