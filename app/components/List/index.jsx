import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {default as Item } from './Item/index.jsx';

import './style.less';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    
    
    }
    render(){
        return(
            <div className="list-container">
                {this.props.data.map((item,index)=>{
                        item.id=index;
                        return <Item key={index} data={item}/>
                    })}
            </div>
        );
    }
}
export default List;