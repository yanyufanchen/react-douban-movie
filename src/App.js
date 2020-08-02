import React from 'react'
import { HashRouter, Route, Link, Redirect,Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb ,Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import style from './style/app.module.scss'
import Home from './comportents/home/Home.js'
import Movie from './comportents/movie/Movie.js'
import About from './comportents/about/About.js'
import MovieDetail from './comportents/movie/MovieDetail'
const { Header, Content, Footer } = Layout;




export default class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          key: window.location.hash.split('/')[1]
      }
  }

  render() {
      return (
          <HashRouter>
              <Layout className={style.layout} >
                  {/* 头部区域 */}
                  <Header>
                      <div className={style.logo} >
                      </div>
                      {/* location.hash.split('/')[1] ----可以获取到地址栏hash路径，然后动态赋值到tab栏 */}
                      <Menu
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={[window.location.hash.split('/')[1]||'home']}
                          style={{ lineHeight: '64px' }}
                      >
                          <Menu.Item key="home">
                              <Link to="/home">首页</Link>
                          </Menu.Item>
                          <Menu.Item key="movie">
                              <Link to="/movie">电影</Link>
                          </Menu.Item>
                          <Menu.Item key="about">
                              <Link to="/about">关于</Link>
                          </Menu.Item>
                          {/* <Menu.Item key="text">
                              <Link to="/text">ces</Link>
                          </Menu.Item> */}
                      </Menu>
                  </Header>
                  <Content >
                      {/* 中间内容区 */}
                      <div className={style.content}>
                          
                          <Switch>
                          <Route exact path="/" render={() => <Redirect to="/home" />} />
                          <Route  path="/home" component={Home} />
                          <Route exact path="/movie/detail/:id" component={MovieDetail} />
                          <Route  path="/movie" component={Movie} />
                          <Route  path="/about" component={About} />
                          </Switch>
                      </div>
                  </Content>
                  {/* 尾部区域 */}
                  <Footer style={{ textAlign: 'center' }}>豆瓣电影 ©{new Date().getFullYear()} Created by Peng Wang</Footer>
              </Layout>
          </HashRouter>
      )
  }
  
}
