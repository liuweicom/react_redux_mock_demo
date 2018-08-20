import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as storeActionsFromFile from '../../../actions/store'

import BuyAndStore from '../../../components/BuyAndStore/index.jsx'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore: false
        };

    }
    render(){
        console.log(this.props, 'propsbuy-------------');
        return(
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        );
    }
    componentDidMount(){
        this.checkStoreState();
    }
    checkStoreState(){
        const id = this.props.id;
        const store = this.props.store;

        store.some(item => {
            if(item.id === id){
                this.setState({
                    isStore:true
                });
                return true;
            }
        });
    }

    loginCheck(){
        const id = this.props.id;
        const userinfo = this.props.userinfo;

        if(!userinfo.username){
            this.props && this.props.history.push('/Login/'+encodeURIComponent('/detail/'+id));
            return false;
        }
        return true;
    }

    buyHandle(){
        const loginFlag = this.loginCheck();
        if(!loginFlag){
            return;
        }
        this.props && this.props.history.push('/User');
    }

    storeHandle(){
        const loginFlag = this.loginCheck();
        if (!loginFlag) {
            return
        }

        const id = this.props.id;
        const storeAction = this.props.storeActions;

        if(this.state.isStore){
            storeAction.rm({id:id});
        }else{
            storeAction.add({id:id});
        }

        this.setState({
            isStore : !this.state.isStore
        });
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)