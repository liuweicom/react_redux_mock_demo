import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getInfoData } from '../../../fetch/detail/detai'
import DetailInfo from '../../../components/DetailInfo/index.jsx'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info: false

        }
    }

    render(){
        console.log(this.state.info,'this.state.info------');
        return(
            <div>
            {
                this.state.info
                ?<DetailInfo data={this.state.info}/>
                :''
            }
            </div>
        );
    }

    componentDidMount(){
        console.log('didmount-------');
        this.getInfo();
    }

    getInfo(){
        const id = this.props.id;
        const result=getInfoData(id);
        let self=this;
        result.then(res =>{
            return res.json();
        }).then(json =>{
            self.setState({
                info: json
            });
        }).catch(er =>{
            if(__DEV__){
                console.error('详情页，获取商户信息出错')
            }
        }
        );
    }
}
export default Info;