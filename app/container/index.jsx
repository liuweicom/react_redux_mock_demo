import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore.js'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import {HashRouter, hashHistory,Route, Switch,Redirect } from 'react-router-dom';
import Home from '../container/Home/index.jsx'
import City from '../container/City/index.jsx'
import User from '../container/User/index.jsx'
import Search from '../container/Search/index.jsx'
import Detail from '../container/Detail/index.jsx'
import NotFound from '../container/404'
import Login from '../container/Login/index'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            initDone:false
        }
    }

   

    render(){
        console.log(this.state.initDone, this.props.children, 'render---------');
       // this.props.children //用来表示所有的子组件
        return(
            <div>
               { this.state.initDone

                   ?
                   <div>
                       <Switch>
                           <Route path="/" exact component={Home}></Route>
                           <Route path="/city"  component={City}></Route>
                           <Route path="/user"  component={User}></Route>
                           <Route path="/detail/:id"  component={Detail}></Route>
                           <Route path="/Login"  component={Login}></Route>
                           <Route path="/search/:category/:keyword?" component={Search}></Route>
                       </Switch>
                   </div>
                 : <div>加载中....</div>
               }
            </div>
        );
    }

    componentDidMount(){

        // 获取位置信息
        let cityName = LocalStore.getItem(CITYNAME)
        if (cityName == null) {
            cityName = '北京'
        }
        this.props.userInfoActions.update({
            cityName: cityName
        })

        // 更改状态
        this.setState({
            initDone: true
        })
}
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
  
