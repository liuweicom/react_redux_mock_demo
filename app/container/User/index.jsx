import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router-dom'

import Header from '../../components/Header/index'
import UserInfo from '../../components/UserInfo/index'
import OrderList from './subpage/OrderList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        const userinfo = this.props.userinfo || {};
        return(
            <div>
                <Header title='用户主页' backRouter='/home' history={this.props.history}/>
                <UserInfo username={userinfo.username || ''} city={userinfo.cityName || ''}/>
                <OrderList  username={userinfo.username|| ''}/>
            </div>
        );
    }
    componentDidMount(){
        if(!(this.props.userinfo && this.props.userinfo.username)){
            this.props.history.push('/Login');
        }
    }
}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)