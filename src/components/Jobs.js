import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import List from './List';
import Job from './Job';

@inject('content')
@observer
class Jobs extends Component {
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
    props.content.showJobs(page);
  }

  render() {
    return <List itemRenderer={Job} items={this.props.content.items}/>
  }
}

export default Jobs;
