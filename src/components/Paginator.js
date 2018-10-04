import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {NavLink as RRNavLink, withRouter} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

@inject('content')
@observer
class Paginator extends Component {
  get pages() {
    let root;
    let pages = [];
    switch(this.props.content.itemsType) {
      case 'topstories':
        root = "/stories/top";
        break;
      case 'newstories':
        root = "/stories/new";
        break;
      case 'beststories':
        root = "/stories/best";
        break;
      case 'askstories':
        root = "/ask";
        break;
      default:
        break;
    }
    for (let i = 1; i <= this.props.content.maxPages ; i++) {
      let link = `${root}/${i}`;
      pages.push(
        <PaginationItem key={`${this.props.content.itemsType}-${i}`}>
          <PaginationLink
            tag={RRNavLink}
            to={link}
            className="bg-dark text-light"
            activeClassName="font-weight-bold"
          >{i}</PaginationLink>
        </PaginationItem>
      )
    }
    return pages;
  }

  render() {
    console.log(this.props);
    return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination aria-label="Page navigation">
        {this.pages}
      </Pagination>
    </div>
    )
  }
}

export default withRouter(Paginator);
