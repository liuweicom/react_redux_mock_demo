import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Header from '../../components/Header';
import LoginComponent from '../../components/Login/index';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo';
import {hashHistory} from 'react-router-dom';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            checking:true
        }
    }
    render(){
        return(
            <div>
                <Header title='登录' history={this.props.history}/>
                {
                    this.state.checking
                    ?<div>{ '等待中'}</div>
                    :<LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        );
    }
    componentDidMount(){
        this.doCheck();
    }
    doCheck(){
        const username = this.props.userinfo;
        if(username.username) {
            this.goUserPage();
        }else{
            this.setState({
                checking: false
            });
        }
    }
    goUserPage(){
        this.props.history.push('/User');
    }
    loginHandle(username){
        console.log(this.props,'onchanske-------');
        const action = this.props.userInfoActions || {};
        let userinfo = this.props.userinfo || {};
        userinfo.username = username;
        action.update(userinfo);

        const param = this.props.match.params;
        const router = param.router;
        if(router){
            this.props.history.push(router);
        } else {
            this.goUserPage();
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
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)