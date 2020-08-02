import React, { Component } from 'react'
import { Skeleton } from 'antd';
import style from '../../style/about.module.scss'
export default class About extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className={style.banner}>
                    <h1>关于我们</h1>
                    <h3>React 豆瓣电影项目展示</h3>
                    <p>本站资源来源于豆瓣电影,只做分享展示，不提供影片资源存储</p>
                    <p>有任何版权问题，请联系592394158@qq.com邮箱来信，我们会及时处理</p>
                </div>
                <Skeleton />
            </div>
        )
    }
}
