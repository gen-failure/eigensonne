import React, { Component } from 'react';
import {ListGroup} from 'reactstrap';

import './List.scss';

class List extends Component {
  render() {
    let ItemRenderer = this.props.itemRenderer;
    return (
      <ListGroup className="mt-4 list-component">
        {this.props.items.map((item) => {
          return <ItemRenderer {...item} key={item.id} />
        })}
      </ListGroup> 
      )
  }
}

export default List;
