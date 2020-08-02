import React from 'react'
import style from '../../style/home.module.scss'
import { Tabs, Row, Col, List, Typography, Carousel } from 'antd';
let that = ''
let activeKey = '1'


const { TabPane } = Tabs;

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            apikey: '0b2bdeda43b5688921839c8ecb20399b',
            topList: [],
            paihangbangList1: [],
            paihangbangtitle1: '',
            paihangbangList2: [],
            paihangbangtitle2: '',
            paihangbangList3: [],
            paihangbangtitle3: ''
        }
    }

    render() {
        that = this
        return (
            <Row style={{ height: '100%' }}>
                <Col span={18} style={{ paddingLeft: '0.3rem', height: '100%' }} >
                    <div style={{ borderRight: '1px solid #eee' }}>
                        <Tabs defaultActiveKey={activeKey} onChange={this.HomeTab}>
                            <TabPane tab={this.state.paihangbangtitle1} key="1">
                                <div className={style.lunbo} style={{ width: '100%', marginRight: '10px' }}>
                                    <div className={style.mlist}>
                                        {this.state.paihangbangList1.map((item) =>
                                        // <Link to="" >
                                        <div className={style.mibox}>
                                            <div onClick={()=>this.toDetail(item.subject.id)} key={item.rank} className={style.mitem}>
                                                <div className={style.imgbox}>
                                                    <img src={item.subject.images.small} alt="" />
                                                </div>
                                                <div style={{ textAlign: 'center', height: '30px', lineHeight: '30px', overflow: 'hidden' }}>
                                                    <span style={{ fontSize: '15px', marginRight: '10px', width: '1rem' }}>{item.subject.title}</span>
                                                    <span style={{ fontSize: '15px', color: '#E19015' }}>{item.subject.rating.average}</span>
                                                </div>
                                            </div>
                                        </div>
                                        // </Link>
                                            )}

                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab={this.state.paihangbangtitle2} key="2">
                                <div className={style.lunbo} style={{ width: '100%', marginRight: '10px' }}>
                                    <div className={style.mlist}>
                                        {this.state.paihangbangList2.map((item) =>
                                        <div className={style.mibox}>
                                            <div onClick={()=>this.toDetail(item.subject.id)} key={item.rank} className={style.mitem}>
                                                <img src={item.subject.images.small} alt="" />
                                                <div style={{ textAlign: 'center', height: '0.3rem', lineHeight: '0.3rem', overflow: 'hidden' }}>
                                                    <span style={{ fontSize: '15px', marginRight: '0.1rem', width: '1rem' }}>{item.subject.title}</span>
                                                    <span style={{ fontSize: '15px', color: '#E19015' }}>{item.subject.rating.average}</span>
                                                </div>
                                                </div>
                                            </div>)}

                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab={this.state.paihangbangtitle3} key="3">
                                <div className={style.lunbo} style={{ width: '100%',  marginRight: '10px' }}>
                                    <div className={style.mlist}>
                                        {this.state.paihangbangList3.map((item,index) =>
                                        <div className={style.mibox}>
                                            <div onClick={()=>this.toDetail(item.id)} key={item.id} className={style.mitem}>
                                                <img src={item.images.small} alt="" />
                                                <div style={{ textAlign: 'center', height: '30px', lineHeight: '30px', overflow: 'hidden' }}>
                                                    <span style={{ fontSize: '15px', marginRight: '10px', width: '100px' }}>{item.title}</span>
                                                    <span style={{ fontSize: '15px', color: '#E19015' }}>{item.rating.average}</span>
                                                </div>
                                                </div>
                                            </div>)}
                                            
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
                <Col span={6} style={{ padding: '0.1rem 0.3rem 0.3rem 0.2rem', height: '100%' }}>
                    <h3 style={{ marginBottom: 16, fontWeight: 520 }}>评分排行榜</h3>
                    <List
                        // header={<div>Header</div>}
                        footer={<div>查看更多</div>}
                        bordered
                        dataSource={this.state.topList}
                        renderItem={item => (
                            <List.Item  onClick={()=>this.toDetail(item.id)} style={{cursor:"pointer"}}>
                                <Typography.Text mark>[Top]</Typography.Text> {item.title}
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            
        )
    }
    componentDidMount() {
        console.log(3333333)
        this.getTopList()
        this.getpaihangbang1()
        this.getpaihangbang2()
        this.getpaihangbang3()
        var sendData = new URLSearchParams()
        sendData.append('client_id', '557f07a8-14a3-4d30-8c40-59f667d97133')
        sendData.append('scope', 'openid profile CnBlogsApi')
        sendData.append('response_type', 'code id_token')
        sendData.append('redirect_uri', 'https://oauth.cnblogs.com/auth/callback')
        sendData.append('state', 'cnblogs.com')
        sendData.append('nonce', 'cnblogs.com')
        fetch("https://oauth.cnblogs.com/connect/authorize", {
          method: "POST",
          headers: {
            "cache-control": "no-cache"
          },
          body: sendData
        })
        .then(response => {
          console.log(response,77777777);
        })
        .catch(err => {
          console.log(err,777777778);
        });
    }
    HomeTab(key) {
        console.log(key);
        console.log(111);
        activeKey = key
        console.log(activeKey);
    }
    async getTopList() {
        const res = await this.$http(this.baseURL + '/v2/movie/top250?apikey=' + this.state.apikey + '&start=0&count=10')
        const data = await res.json()
        console.log(data, '数据');
        if (!data) return
        // let namelist = []
        // data.subjects.filter(item => {
        //     namelist.push(item.title)
        // })
        // console.log(namelist);

        this.setState({
            topList: data.subjects
        })
    }
    async getpaihangbang1() {
        const res = await this.$http(this.baseURL + '/v2/movie/weekly?apikey=' + this.state.apikey)
        const data = await res.json()
        console.log(data, '数据1');
        if (!data) return
        this.setState({
            paihangbangList1: data.subjects,
            paihangbangtitle1: data.title
        })
    }
    async getpaihangbang2() {
        const res = await this.$http(this.baseURL + '/v2/movie/us_box?apikey=' + this.state.apikey)
        const data = await res.json()
        console.log(data, '数据2');
        if (!data) return
        this.setState({
            paihangbangList2: data.subjects,
            paihangbangtitle2: data.title
        })
    }
    async getpaihangbang3() {
        const res = await this.$http(this.baseURL + '/v2/movie/new_movies?apikey=' + this.state.apikey)
        const data = await res.json()
        console.log(data, '数据3');
        if (!data) return
        this.setState({
            paihangbangList3: data.subjects,
            paihangbangtitle3: data.title
        })
    }
    // 前往详情页
    toDetail(id){
        console.log(id,'id');
        this.props.history.push('/movie/detail/'+id)
    }
}
