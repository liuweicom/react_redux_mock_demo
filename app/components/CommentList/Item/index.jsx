import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Star from '../../Star'

import './style.less'

class CommentItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const data = this.props.data;
        return(
            <div className='comment-item'>
                <h3>
                    <i className='icon-user'/>
                    &nbsp;
                    {data.username}
                </h3>
                <Star star={data.star}/>
                <p>{data.comment}</p>
            </div>
        );
    }
}
export default CommentItem;
