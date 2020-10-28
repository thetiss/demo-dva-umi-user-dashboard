/*
 * @Author: hiyan 
 * @Date: 2020-10-28 11:16:31 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-10-28 11:39:01
 */
import React from 'react'
import withRouter from 'umi/withRouter'
import styles from './index.css'
import Header from './Headers'


const Layout = ({ children, location }) => {
    return(
        <div className={styles.normal}>
            <Header location={location} />
            <div className={styles.content}>
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default withRouter(Layout)