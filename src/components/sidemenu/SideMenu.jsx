import React from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SideMenu.css';

const SideMenu = ({ show, onHide, categories }) => (
    <Offcanvas show={show} onHide={onHide} placement="start">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Categorías</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Nav className="flex-column">
                {categories.map(cat => (
                    <Nav.Link key={cat.href} href={cat.href} onClick={onHide}>
                        {cat.name}
                    </Nav.Link>
                ))}
            </Nav>
            <Button
                variant="outline-light"
                className="w-100 login-btn"
                onClick={() => {
                    // Aquí puedes agregar la lógica para abrir el modal/login
                    onHide();
                    window.location.href = '/login'; // Redirige a la página de login
                }}
            >
                Iniciar sesión
            </Button>
        </Offcanvas.Body>
    </Offcanvas>
);

SideMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
};

export default SideMenu;