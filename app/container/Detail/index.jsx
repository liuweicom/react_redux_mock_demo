import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx';
import Info from './subpage/Info.jsx';
import Comment from './subpage/Comment';
import Buy from './subpage/buy.jsx';
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        console.log(this.props,'this.props-detail------');
        const id =this.props.match.params.id || '';
        return (
            <div>
               <Header title='商户详情' type="share" history={this.props.history}/>
                <Info id={id}/>
                <Buy history={this.props.history} id={id}/>
                <Comment id={id}/>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Detail
export default  Detail;