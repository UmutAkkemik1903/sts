import React, {useEffect, useState} from "react";
import axios from "axios";
import {observer,inject} from "mobx-react";
import {useHistory,Link} from 'react-router-dom';
import {Navbar,Container,Nav,NavDropdown, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Layout = (props) => {
    const [user,setUser] =useState({});
    const [isLoggedIn,setIsLoggedIn] =useState(false);
    props.AuthStore.getToken();
    const history = useHistory();
    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post('/api/authenticate',{},{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {

            if (!res.data.isLoggedIn){
                history.push('/login')
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.user)
        }).catch(e => history.push('/login'))
    },[])

    const logout = () => {

        axios.post('/api/logout',{},{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then(res => swal('Çıkış Yapıldı')).catch(e => swal(e));
        props.AuthStore.removeToken();
        history.push('/login');
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Stok Takip</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Yönetim Paneli</Link>
                            <Link className='nav-link' to="/customers">Müşteri & Tedarikçi Hesapları</Link>
                            <Link className='nav-link' to="/category">Kategori</Link>
                            <Link className='nav-link' to="/products">Ürünler</Link>
                            <Link className='nav-link' to="/stock">Stok</Link>
                        </Nav>

                        <Nav className="me-auto">

                            <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item >Profil Düzenle</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Çıkış</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>{props.children}</div>
        </>
    )
}

export default inject("AuthStore")(observer(Layout));
