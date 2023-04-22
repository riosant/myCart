import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';

import {useState} from "react";
import {Link, NavLink} from "react-router-dom";

const Header = () => {

    const [showBasic, setShowBasic] = useState(true);

    return (
        <header>
            <MDBNavbar expand='lg' light>
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        onClick={() => setShowBasic(!showBasic)}
                        aria-controls='navbarExample01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        style={{alignSelf: 'flex-start'}}
                    >
                        <MDBIcon fas icon='bars' />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showBasic} style={{width: '100%', textAlign: 'center'}}>
                        <MDBNavbarNav right className='mb-2 mb-lg-0'>
                            <MDBNavbarItem active>
                                <Link to='/'>
                                    <span className="nav-link">Home</span>
                                </Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <Link to='/cart'>
                                    <span className="nav-link">Cart</span>
                                </Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>About</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
}

export default Header