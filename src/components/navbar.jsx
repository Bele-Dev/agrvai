import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from './vacipets.png';

function Navbar() {
    const [active, setActive] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");
    const location = useLocation(); // Obtém a localização atual

    const navToggle = () => {
        active === 'nav__menu' ? setActive('nav__menu nav__active') : setActive('nav__menu');

        toggleIcon === 'nav__toggler' ?
            setToggleIcon('nav__toggler toggle') :
            setToggleIcon("nav__toggler");
    };

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null; // Verifica se o token está presente
    };

    return (
        <nav className='nav'>
            <div className="logo">
                <Link to={'/'}>
                    <img src={logo} alt="" id='img' />
                </Link>
            </div>
            <ul className={active}>
                <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
                <li className="nav__item"><Link to="/sobre" className="nav__link">Sobre Nós</Link></li>
                <li className="nav__item"><Link to="/saiba" className="nav__link">Saiba Mais</Link></li>
                <li className="nav__item"><Link to="/contatos" className="nav__link">Contatos</Link></li>
                <li className="nav__item"><Link to="/loc" className="nav__link">Clínicas</Link></li>
                                
                {/* Alterar o link de Login para Cadastrar Pet se estiver na rota /meuspets */}
                {location.pathname === '/meuspets' ? (
                    <li className="nav__item"><Link to="/login" className="nav__link">Cadastrar Pet</Link></li>
                ) : (
                    <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
                )}
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

export default Navbar;
