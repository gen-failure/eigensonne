import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import List from './List';
import Story from './Story';

@inject('content')
@observer
class Stories extends Component {

  componentWillMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(props) {
    if ((props.match.params.page !== this.props.match.params.page) || (props.match.params.pool !== this.props.match.params.pool)) {
      this.fetchData(props); 
    }
  }

  fetchData(props) {
    let page = props.match.params.page || 1;
    switch(props.match.params.pool) {
      case 'top':
        props.content.showTopStories(page);
        break;
      case 'new':
        props.content.showNewStories(page);
        break;
      case 'best':
        props.content.showBestStories(page);
        break;
      default:
        break;
    }
  }

  render() {
    return <List itemRenderer={Story} items={this.props.content.items}/>
  }
}

export default Stories;
