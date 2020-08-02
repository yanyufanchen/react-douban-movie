import React from 'react'
import { Route, Link,Redirect } from 'react-router-dom'
import { Spin, Card, Rate, Pagination } from 'antd';
import style from '../../style/movielist.module.scss'
import  '@ant-design/icons';
const { Meta } = Card;




export default class MovieList extends React.Component {
    constructor(props) {
        console.log(props.match.params, '传参');

        super(props)

        this.state = {
            apikey: '0b2bdeda43b5688921839c8ecb20399b',
            type: props.match.params.type,
            count: 10,
            page: props.match.params.page,
            isloading: true, //是否加载中
            movieList: [], //电影列表
            total: 0
        }
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#fff',
                // height: '100%'
            }}>
                {this.state.isloading ?
                    <div className={style.example}>
                        <Spin size="large" />
                    </div> :
                    <div style={{
                        backgroundColor: '#fff',
                        // height: '100%'
                    }}>
                        <div className={style.mlist}>
                            {this.state.movieList.map((item) =>
                            <div className={style.mibox}>
                                <div className={style.mitem} key={item.id} onClick={()=>this.toDetail(item.id)}> 
                                    <Card
                                        bodyStyle={{padding: '10px'}}
                                        hoverable
                                        
                                        cover={<img alt="example" src={item.images.small} />}
                                    >
                                        <Meta title={item.title} style={{ padding: "1px"}} />
                                        <p style={{ fontSize: '12px',margin: '5px' }}>电影类型：{item.genres.join(',')}</p>
                                        {/* <p style={{ fontSize: '12px' }}>上映年份：{item.mainland_pubdate}</p> */}
                                        {/* <p style={{ fontSize: '12px' }}>评分：{item.rating.average}</p> */}
                                        <Rate className={style.rate} disabled defaultValue={item.rating.average/2} />
                                    </Card>
                                </div>
                                </div>
                            )}

                        </div>
                        <div className={style.fenye}>
                            <Pagination style={{display: 'inline-block'}} current={parseInt(this.state.page)} 
                            defaultPageSize={this.state.count} total={this.state.total}
                            onChange={(page,count)=>this.pageChange(page,count)}
                            />
                        </div>
                    </div>
                    
                }
                {/* <Route path="/movie/:type/MovieDetail" component={MovieDetail} /> */}
            </div>
            
        )
    }
    // 组件将要挂载
    componentDidMount() {
        console.log('挂载');
        this.getMovieList()
    }
    // 数据更新触发
    componentWillReceiveProps(nextProp) {
        console.log(nextProp.match.params, '传参2');
        this.setState({
            start: (nextProp.match.params.page - 1) * this.state.count,
            type: nextProp.match.params.type,
            page: nextProp.match.params.page
        }, () => {
            this.getMovieList()
        })
        console.log('更新');
    }
    // 获取电影列表
    async getMovieList() {
        console.log(this.state.type,'类型');
        
        let start = (this.state.page - 1) * this.state.count
        const res = await this.$http(this.baseURL + '/v2/movie/' + this.state.type + '?apikey=' + this.state.apikey + '&start=' + start + '&count=' + this.state.count)
        const data = await res.json()
        console.log(data, '数据');
        if (!data) return
        this.setState({
            isloading: false,
            movieList: data.subjects,
            total: data.total
        })
    }
    // 分页发生变化
    pageChange(page,count){
        console.log(page,count);
        this.props.history.push('/movie/'+this.state.type+'/'+page)
        // this.setState({
        //     page: page
        // })
    }
    // 前往详情页
    toDetail(id){
        console.log(id,'id');
        this.props.history.push('/movie/detail/'+id)
    }
}
