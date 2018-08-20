import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeAd from '../../../components/HomeAd/index'
import { getAdData } from '../../../fetch/home/home'

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        const result=getAdData();
        result.then(ers=>{
            return ers.json();
        }).then(json=>{
            const data=json;
            this.setState({data:data});
        }).catch(ex=>{
            if(__DEV__){
                console.error('首页广告模块获取数据报错, ', ex.message);
            }
        });

    }
    render(){
        console.log(this.state.data,'data00000000');
        return(
            <div>
              {this.state.data.length?
            <HomeAd data={this.state.data}/>
            :<div>{/* 加载中... */}</div>
            }
            </div>
        );
    }
}
export default Ad;