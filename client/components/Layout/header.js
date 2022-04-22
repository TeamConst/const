import React, {useState, useEffect} from 'react'
// import {Link} from 'next/link'
import {RiCopperCoinLine} from 'react-icons/ri'
import {FaBars, FaTimes} from 'react-icons/fa'
import {Button} from './Button'
import { Link } from '@reach/router';
import {IconContext} from 'react-icons/lib'
import styled from "styled-components";

function Header() {
    const Navbar = styled.div`
    background: #fff;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
    `;
    const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    `;
    const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
    `;
    const NavbarLogo = styled.div`
    color: #000;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
    `;
    const NavItem  = styled.div`
    height: 45px;
    border-bottom: 2.5px solid transparent;
    `;
    const NavLink  = styled.div`
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    `;
    const NavMenu  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    text-align: center;
    justify-content: end;
    `; 
    return (
        <>
        <IconContext.Provider value={{ color: '#fff'}}>
           <Navbar>
            <NavbarContainer>
              <Link to='/' >  <NavbarLogo> 
                    Atshena
           </NavbarLogo>     </Link>
                <NavMenu>
                    <NavItem>
                    <NavLink>  
                        <Link to='/Create'>
                            Create
                        </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                   <Link to='/Create' > 
                    <NavLink> 
                            Create
                   </NavLink>    
                    </Link>
                    </NavItem>
                    <NavItem>
                    <NavLink>  
                        <Link to='/Create'>
                            Create
                        </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>  
                            <Link to='/Create' >
                            Create
                        </Link>
                        </NavLink>
                      
                    </NavItem>
                    </NavMenu>

            </NavbarContainer>
        </Navbar>
        </IconContext.Provider>
        </>
    )
}

export default Header
