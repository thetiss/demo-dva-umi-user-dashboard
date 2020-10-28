import { Menu, Icon, } from 'antd'
import Link from 'umi/link'

const Header = ({ location }) => {
    return(
        <Menu 
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="dark">
            <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Home</Link>
            </Menu.Item>
            <Menu.Item key="/users">
                <Link to="/users"><Icon type="bars" />Users</Link>
            </Menu.Item>            
            <Menu.Item key="/films">
                <Link to="/films"><Icon type="bars" />Films</Link>
            </Menu.Item>
            {/* <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Home</Link>
            </Menu.Item>
            <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Home</Link>
            </Menu.Item> */}
        </Menu>
    )
}
export default Header