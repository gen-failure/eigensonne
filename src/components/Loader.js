import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import spinnerImage from '../logo.svg'; //let'use react logo for the spinner
import './Loader.scss';

@inject('content')
@observer
class Loader extends Component {
  render() {
    return (
      <div className="loader-component">
        <img src={spinnerImage} alt="Loader" />
        <p>Loading data</p>
      </div>
    );
  }
}

export default Loader;
