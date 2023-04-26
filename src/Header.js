import {useState} from "react";
import {Link} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";

const Header = () => {

    const [showBasic, setShowBasic] = useState(true);

    return (
        <header>
            <Navbar expand='lg'>
                <Container fluid>
                    <Link to="/">Home</Link>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header