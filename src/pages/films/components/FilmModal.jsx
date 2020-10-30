/*
 * @Author: hiyan 
 * @Date: 2020-10-30 11:03:09 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-30 12:51:33
 */
import { Modal, Form, Input } from 'antd';


 const FilmForm = ({visible, onCancel, onCreate }) => {

    return(
        <div>
            <Modal
                visible={visible}
                title="电影信息"
                onCancel={onCancel}
                >
                    <Form>
                    <Form.Item
                        name="name"
                        label="电影名"
                        rules={[
                             {
                                required: true,
                                message: 'Please input the title of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="director"
                        label="导演"
                        rules={[
                             {
                                required: true,
                                message: 'Please input the title of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </Form>
                </Modal>
        </div>
    )

 }
 export default FilmForm