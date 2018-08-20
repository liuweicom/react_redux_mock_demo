import React from 'react'
import {HashRouter, hashHistory,Route, Switch,Redirect } from 'react-router-dom';

import App from '../container/index.jsx'


// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps


// <HashRouter history={hashHistory}>
//     <Switch>
//     <Route path="/" component={App} exact></Route>
// <Route path='/Login(/:router)' component={Login}/>
//     <Route path="/user" component={User}></Route>
//     <Route path="/search/:type(/:keyword)" component={Search}></Route>
//     <Route path="/detail/:id" component={Detail}></Route>
//     <Redirect path='*'to={NotFound}></Redirect>    */}
//
// </Switch>
// </HashRouter>
//
// {/* <Route path="/city" component={City}></Route> 
// <Route path="/user" component={User}></Route>
// <Route path="/search/:type(/:keyword)" component={Search}></Route>
// <Route path="/detail/:id" component={Detail}></Route>
// <Route path="/*" component={NotFound}></Route>    */}

class RouterMap extends React.Component {
    render(){
        return(
            <HashRouter>
                    <Route path="/" component={App}>
                    </Route>
            </HashRouter>
        );
    }
}
export default RouterMap;