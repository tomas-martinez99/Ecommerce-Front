import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap'
import { FaShoppingCart, FaBars } from 'react-icons/fa'
import SideMenu from '../sidemenu/SideMenu'
import "./Header.css"
const BRANDS = [{ id: 1, name: 'Vertigo' },
{ id: 2, name: 'Plastica VC' },
{ id: 3, name: 'TSL' },
{ id: 4, name: 'Motul' },
{ id: 5, name: 'Riffel' },
{ id: 6, name: 'Ritsuka' },
{ id: 7, name: 'HorngFortune' },
{ id: 8, name: 'Giangiu' },]
const CATEGORIES = [
    { name: 'Cascos', href: '/cascos' },
    { name: 'Plasticos', href: '/repuestos' },
    { name: 'Cubiertas', href: '/cubiertas' },
    { name: 'Indumentaria', href: '/indumentaria' },
    { name: 'Lubricantes', href: '/lubricantes' },
    { name: 'Baules y Soportes', href: '/baules' },
    { name: 'Accesorios', href: '/seguridad' },
    { name: 'Transmision', href: '/outdoor' },
];


export default class Header extends PureComponent {
    static propTypes = {}
    state = {
        showMenu: false
    };
    handleMenuOpen = () => this.setState({ showMenu: true });
    handleMenuClose = () => this.setState({ showMenu: false });

    render() {
        return (
            <header>
                <Navbar expand="xl" fixed='top' className='flex-column' style={{ backgroundColor: '#e81123', }}>
                    <Container fluid>
                           {/* Botón hamburguesa */}
                            <Button
                                variant="link"
                                className="me-3 p-2 "
                                onClick={this.handleMenuOpen}
                                style={{ color: "#fff" }}
                                aria-label="Abrir menú"
                            >
                                <FaBars size={28} />
                            </Button>
                        {/* Logo a la izquierda */}
                        <div className="d-flex align-items-center w-100">
                            <Navbar.Brand href="/"><img
                                src="/src/assets/logo.png"
                                alt="Logo"
                                width="120"
                                height="60"
                                className="d-inline-block align-top"
                            /></Navbar.Brand>
                            {/* Buscador en el centro */}
                            <Form className="mx-auto w-50 d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar productos, marcas y ofertas..."
                                    className="search me-2"
                                    aria-label="Buscar"
                                />
                                <Button className='btn1'>Buscar</Button>
                            </Form>
                            {/* Carrito a la derecha */}
                            <div className="ms-auto">
                                <Button className='btn1' href="/cart">
                                    <FaShoppingCart size={24} />
                                </Button>
                            </div>
                        </div>
                    </Container>
                    <Container fluid>
                        <div className="d-flex justify-content-center">
                          
                            <Nav >
                                {BRANDS.map(brand => (
                                    <Button
                                        key={brand.id}
                                        className="btn2 mx-2"
                                        href={`/marca/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                        {brand.name}
                                    </Button>
                                ))}
                                <Button 
                                className='btn2 mx-2' 
                                href="/productList">
                                    Productos</Button>
                            </Nav>
                        </div>
                    </Container>
                </Navbar>
                <SideMenu
                    show={this.state.showMenu}
                    onHide={this.handleMenuClose}
                    categories={CATEGORIES}
                />
            </header>
        );
    }
}

