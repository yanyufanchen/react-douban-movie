import React from 'react'
import style from '../../style/moviedetail.module.scss'
import { Divider, Spin, Typography, Descriptions, Tag, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.match.params, 'id');

        this.state = {
            apikey: '0b2bdeda43b5688921839c8ecb20399b',
            data: {},
            isloading: true, //是否加载中
        }
    }

    render() {
        const data = this.state.data
        return (
            <div style={{
                backgroundColor: '#fff',
                // height: '100%'
            }}>
                {this.state.isloading ?
                    <div className={style.example}>
                        <Spin size="large" />
                    </div> :
                    <div className={style.detail}>
                        <div className={style.header}>
                            <div className={style.button} onClick={() => this.goback()}>
                                <LeftOutlined className="icon" />
                                <span>Go back</span>
                            </div>
                        </div>
                        <Divider />
                        <div className={style.centent}>
                            {/* 电影封面 */}
                            <div className={style.centent_header}>
                                <div className={style.title}>{data.title}</div>
                                <img src={data.images.small} alt="" />
                            </div>
                            {/* 电影简介 */}
                            <div className={style.synopsis}>
                                <Descriptions title="影片简介：" />
                                {data.tags.map(item => <Tag key={item}>{item}</Tag>)}
                                <Paragraph style={{ marginTop: '10px' }} ellipsis={{ rows: 3, expandable: true }}>
                                    {data.summary}
                                </Paragraph>

                            </div>
                            {/* 电影说明 */}
                            <div >
                                <Descriptions

                                    title="影片详情："
                                    bordered
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                >
                                    <Descriptions.Item key="1" label="类型">{data.genres.join(',')}</Descriptions.Item>
                                    <Descriptions.Item key="2" label="语言">{data.languages.join(',')}</Descriptions.Item>
                                    <Descriptions.Item key="3" label="时长">{data.durations.join(',')}</Descriptions.Item>
                                    <Descriptions.Item key="4" label="上映地">{data.pubdates.join(',')}</Descriptions.Item>
                                    <Descriptions.Item key="5" label="上映时间">{data.pubdate}</Descriptions.Item>
                                    <Descriptions.Item key="6" label="其他译名">{data.aka.join(',')}</Descriptions.Item>
                                </Descriptions>

                            </div>
                            {/* 电影演员 */}
                            <div>
                                <Card title="演员表">
                                    {data.casts.map(item => <Card.Grid key={item.id} style={gridStyle}>
                                        {item.avatars?<img style={{width: '100px',height: '150px'}} src={item.avatars.small} alt="" />:
                                        <div style={{width: '100%',height: '150px' ,textAlign: 'center',backgroundColor: '#eee',lineHeight: '150px'}}>暂无图片</div>}
                                        <h5>{item.name_en}</h5>
                                        <h5>{item.name}</h5>
                                    </Card.Grid>)}
                                </Card>,
                            </div>  
                            {/* 电影资源 */}
                            <div>
                                <Card title="电影资源">
                                    {data.videos.length>0?data.videos.map(item => <a href={item.sample_link} target="_blank" >
                                    <Card.Grid key={item.video_id} style={gridStyle}>
                                        <h5>{item.source.literal}</h5>
                                        <h5>{item.source.name}</h5>
                                        <img style={{height: '50px'}} src={item.source.pic} alt="" />
                                    </Card.Grid>
                                    </a> ):'暂无'}
                                </Card>,
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    }
    componentDidMount() {
        this.getDetail()
    }
    async getDetail() {
        console.log(111);
        // /v2/movie/subject/26861685
        const res = await this.$http(this.baseURL + '/v2/movie/subject/' + this.props.match.params.id + '?apikey=' + this.state.apikey)
        const data = await res.json()
        console.log(data, '数据');
        if (!data) return
        this.setState({
            data: data,
            isloading: false,
        })
    }
    // 返回
    goback() {
        this.props.history.goBack()
    }
}
