import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Ad from './subpage/Ad';
import List from './subpage/List.jsx';
import Category from '../../components/Category/index.jsx';
import HomeHeader from '../../components/HomeHeader/index.jsx';
class Home extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
      console.log(this.props,'props------------');
        return(
            <div>
                <HomeHeader cityName={this.props.userinfo && this.props.userinfo.cityName|| ''}/>
                <Category/>
                <div style={{height: '15px'}}>{/* 分割线 */}</div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        );
    }

}


function mapStateToprops(state){
    console.log(state, 'state------------');
    return{
        userinfo: state.userinfo
    }
}
function mapDipatchToProps(dispatch){
    return{}
}
export default connect(mapStateToprops,mapDipatchToProps)(Home);