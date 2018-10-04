import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('content')
@observer
class Stories extends Component {
  
  componentWillMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentWillReceiveProps(props) {
    if (props.match.params.id !== this.props.match.params.id) {
      this.props.content.showItem(props.match.params.id);
    }
  }

  fetchData(id) {
    this.props.content.showItem(id);
  }

  render() {
    return (
      <div>
        {this.props.content.item && 
        <div>
          <h2>{this.props.content.item.title}</h2>
            {this.props.content.item.text && <p dangerouslySetInnerHTML={{ __html: this.props.content.item.text}} /> }
          </div>
        }
      </div>
    )
  }
}

export default Stories;
