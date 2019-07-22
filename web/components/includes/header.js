import React from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import NavigationData from '../../data/navigation.json';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            navigation: NavigationData.navigation
        }
    }

    toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <header>
                <Navbar color="light" light className="fixed-top">
                    <Container>
                        <NavbarBrand href="/">
                            <img src={ this.state.navigation.logo } />
                        </NavbarBrand>
                        <NavbarToggler onClick={ this.toggleMenu }>
                            <i className="fas fa-bars fa-2x open"></i>
                        </NavbarToggler>
                        <Collapse isOpen={ this.state.isOpen } navbar className="align-middle">
                            <Nav className="ml-auto" navbar>
                                { this.state.navigation.menus.map(function(menu) {
                                    return <NavItem key={ menu.id }><NavLink href={ menu.url }>{ menu.label }</NavLink></NavItem>;
                                })}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }
}