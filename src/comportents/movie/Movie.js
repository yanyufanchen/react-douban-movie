import React from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import '@ant-design/icons';
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class Movie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        return (
            <Layout style={{ height: '100%' }}>
                <Sider width={190} className="site-layout-background" style={{ borderRight: '1px solid #efefef' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['in_theaters']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="in_theaters">
                            <Link to="/movie/in_theaters/1" >正在热映</Link>
                        </Menu.Item>
                        <Menu.Item key="coming_soon">
                            <Link to="/movie/coming_soon/1" >即将上映</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/movie/top250/1" >Top250</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >

                    <Content
                        className="site-layout-background"
                        style={{
                            backgroundColor: '#fff',
                            // height: '100%'
                        }}
                    >
                        <Route path="/movie/" render={() => <Redirect to="/movie/in_theaters/1" />} />
                        <Switch>
                            
                            <Route exact path="/movie/detail/:id" component={MovieDetail} />
                            <Route exact path="/movie/:type/:page" component={MovieList} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
