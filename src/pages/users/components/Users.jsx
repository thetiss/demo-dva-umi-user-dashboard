/*
 * @Author: hiyan 
 * @Date: 2020-10-27 16:35:15 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-27 18:06:37
 */
import { connect } from 'dva'
import { Table, Popconfirm, Button, Pagination, } from 'antd'
import { routerRedux } from 'dva/router'
import { PAGE_SIZE } from '../constants'
import styles from './Users.css';


const Users = ({ dispatch, list: dataSource, loading, total, page: current }) => {
    // action creator
    const deleteHandler = (id) => {
        dispatch({
            type: 'users/remove',
            payload: { id },
        })
    };
    const editHandler = (id,values) => {
        dispatch({
            type: 'users/edit',
            payload: { id, values },
        })
    }
    const createHandler = (values) => {
        dispatch({
            type: 'users/create',
            payload: { values },
        })
    }    
    const pageChangeHandler = (page) => {
        dispatch(routerRedux.push({
            pathname: '/users/',
            query: { page },
        }))
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
        },       
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span className={styles.operation}>
                    <Popconfirm 
                        title="确认删除此用户吗？" 
                        onConfirm={()=>deleteHandler(record.id)}
                        okText='确认'
                        cancelText='取消'>
                        <Button className={styles.button}>Delete</Button>
                    </Popconfirm>
                </span>
            )
        },
    ]
    return(
        <div className={styles.normal}>
            <div>
                <Table
                  loading={loading}
                  columns={columns}
                  dataSource={dataSource}
                  rowKey={record => record.id}
                  pagination={false} />
                  <Pagination 
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={()=>pageChangeHandler}
                    />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
        loading: state.loading.models.users,
    };
    
}
export default connect(mapStateToProps)(Users)