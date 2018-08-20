import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {hashHistory } from 'react-router-dom';

import Header from '../../components/Header/index';
import CurrentCity from '../../components/CurrentCity/index';
import CityList from '../../components/CityList/index';

import * as userInfoActionsFromOtherFile from '../../actions/userinfo';
import {CITYNAME} from '../../config/localStoreKey';
import localStore from '../../util/localStore';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        console.log(this.props, 'props----------');
        return (
            <div>
                <Header title="选择城市" history={this.props.history}/>
                <CurrentCity cityName={this.props.userinfo && this.props.userinfo.cityName || ''}></CurrentCity>
                <CityList changeCity={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
        if(newCity === null){
            return;
        }
        const userinfo =this.props.userinfo;
        userinfo.cityName = newCity;
        this.props.userInfoActions.update(userinfo);

        localStore.setItem(CITYNAME,newCity);

        this.props.history.push('/');
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default City
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
)(City)
