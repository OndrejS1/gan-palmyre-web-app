import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {Container, Nav, Navbar} from "react-bootstrap";

export default function NavbarMenu() {
    return (
        // only desktop menu
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <CustomLink to="/">
                        <img
                            src="/logo-czu.png"
                            className="logo-czu"
                            alt="CZU Logo"
                        />Palmyre OCR</CustomLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <CustomLink to="/">Home</CustomLink>
                        <CustomLink to="/about">About</CustomLink>
                        <CustomLink to="/acknowledgement">Acknowledgement</CustomLink>
                        <CustomLink to="/contacts">Contacts</CustomLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// @ts-ignore
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
