import React, {  useState } from 'react'
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap'
import { FaShoppingCart, FaBars } from 'react-icons/fa'
import SideMenu from '../sidemenu/SideMenu'
import "./Header.css"
import { useBrands } from '../../hooks/brands/useBrands'



export default function Header(){
const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpen = () => setShowMenu(true);
  const handleMenuClose = () => setShowMenu(false);
   const {data: brands = [], isLoading, isError} = useBrands();
   
    console.log("marcas",brands);
        return (
            <header>
                <Navbar expand="xl" fixed='top' className='flex-column' style={{ backgroundColor: '#e81123', }}>
                    <Container fluid>
                           {/* Botón hamburguesa */}
                            <Button
                                variant="link"
                                className="me-3 p-2 "
                                onClick={handleMenuOpen}
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
                                {isLoading && <span className="text-white">Cargando marcas...</span>}
                                {isError && <span className="text-white">Error al cargar marcas</span>}
                                {brands.map(brand => (
                                    <Button
                                        key={brand.id}
                                        className="btn2 mx-2"
                                        href={`/productList?brandId=${brand.id}`}
                                    >
                                        {brand.brandName}
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
                    show={showMenu}
                    onHide={handleMenuClose}
                />
            </header>
        );
    }
Header.propTypes = {}

