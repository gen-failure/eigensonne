import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {NavLink as RRNavLink, withRouter} from 'react-router-dom';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler} from 'reactstrap';

import './Navbar.scss';

@inject('routing')
@inject('content')
@observer
class NavbarComponent extends Component {

    constructor() {
        super();
        this.state = {
            menuExpanded: false
        };
        this.links = [
            {
                url: '/stories/top/',
                text: 'top'
            },
            {
                url: '/stories/best/',
                text: 'best'
            },
            {
                url: '/stories/new/',
                text: 'new'
            },
            {
                url: '/ask/',
                text: 'ask'
            },
            {
                url: '/jobs/',
                text: 'jobs'
            },
        ]
    }

    toggleMenu() {
        this.setState((state) => {
            return Object.assign({}, this.state, {menuExpanded : !this.state.menuExpanded});
        })
    }
    
    render() {
        return (
            <Navbar className="navbar-dark bg-dark navbar-component" expand="md">
                <NavbarBrand href="/">FakeHackerNews <span className="ml-2 headline">{this.props.content.headline}</span></NavbarBrand>
                <NavbarToggler onClick={() => {this.toggleMenu()}} />
                <Collapse isOpen={this.state.menuExpanded} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.links.map((link) => {
                            return (
                                <NavItem key={link.url}>
                                    <NavLink tag={RRNavLink} to={link.url} activeClassName="active">{link.text}</NavLink>
                                </NavItem>
                            )
                        })}
                    </Nav>
                </Collapse>
        </Navbar>
        )
    }
}

export default withRouter(NavbarComponent);
