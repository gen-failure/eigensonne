import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import List from './List';
import Story from './Story';

@inject('content')
@observer
class Questions extends Component {
  componentWillMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(props) {
    if (props.match.params.page !== this.props.match.params.page) {
      this.fetchData(props); 
    }
  }

  fetchData(props) {
    let page = props.match.params.page || 1;
    props.content.showQuestions(page);
  }

  render() {
    return <List itemRenderer={Story} items={this.props.content.items}/>
  }
}

export default Questions;
