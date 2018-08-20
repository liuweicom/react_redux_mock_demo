import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    loadMoreHandle(){
        this.props.loadMoreFn();
    }
    componentDidMount(){
        const loadMoreFn=this.props.loadMoreFn;
        const wrapper=this.refs.wrapper;
        let timeroutId;
        function callback(){
            const top=wrapper.getBoundingClientRect().top;
            const windowHeight=window.screen.height;
            if(top && top<windowHeight){
                loadMoreFn();
            }
        }
        window.addEventListener('scroll',function(){
            if(this.props.isLoadingMore){
                return;
            }
            if(timeroutId){
                clearTimeout(timeroutId);
            }
            timeroutId=setTimeout(callback,50);
        }.bind(this),false);
    }
    render(){
        return(
            <div className="load-more" ref="wrapper">
                {this.props.isLoadingMore?<span>加载中。。。</span>:
            <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>}
            </div>
        );
    }
}

export default LoadMore;