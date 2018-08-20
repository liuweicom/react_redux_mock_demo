import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router-dom'

import SearchInput from '../SearchInput/index.jsx';

import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
render(){
    console.log('searchHeader-------');
    return(
        <div id='search-header' className='clear-fix'>
            <span className='back-icon float-left' onClick={this.clickHandle.bind(this)}>
                <i className='icon-chevron-left'/>
            </span>
            <div className='input-container'>
                <i className='icon-search'/>
                &nbsp;
                <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
            </div>
        </div>
    );
}
enterHandle(){
  hashHistory.push('./search/all'+encodeURIComponent(value));
}
clickHandle(){
    window.history.back();
}
}

export default SearchHeader;