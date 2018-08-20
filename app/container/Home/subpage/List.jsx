import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {default as ListComponent} from '../../../components/List/index.jsx';
import LoadMore from '../../../components/LoadMore/index.jsx';
import { getListData } from '../../../fetch/home/home';
import './style.less';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[],
            hasMore:false,
            isLoadingMore:false,
            page:0
        }
    }

    componentDidMount(){
        console.log('dismount-----');
        this.loadFirstPageData();
    }

    loadFirstPageData(){
        console.log('loadFirstPage-----');
        const cityName=this.props.cityName;
        console.log(cityName,'cityName00000');
        const result=getListData(cityName,0);
        this.resultHandle(result);
    }

    resultHandle(result){
        console.log(result,'result-----');
        let self=this;
        result.then(res=>{
            return res.json()
        }).then(json=>{
            console.log(json,'json----------');
            const hasMore=json.hasMore;
            const data=json.data;

            self.setState({
                hasMore:hasMore,
                data: self.state.data.concat(data)
            });
            console.log(json.data,'jsondata00000');
        }).catch(ex=>{
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        });
    }

    loadMoreData(){
        this.setState({
            isLoadingMore:true
        });
        const city=this.props.cityName;
        const page=this.state.page;
        const result=getListData(city,page);

        this.resultHandle(result);

        this.setState({
            page:page+1,
            isLoadingMore:false
        });
    }

    render(){
        console.log(this.state.data,this.state.hasMore,'list---this.state.data------');
        return(
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length?
                    <ListComponent data={this.state.data}/>
                    :
                    <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore?
                    <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    :''
                }
            </div>
        );
    }
}
export default List;