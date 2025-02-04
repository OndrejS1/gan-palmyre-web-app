import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {Container, Nav, Navbar} from "react-bootstrap";

export default function NavbarMenu() {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <CustomLink to="/">
                        <img
                            src="/logo-czu.png"
                            width="100"
                            height="80"
                            alt="CZU Logo"
                        />Palmyre OCR</CustomLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/acknowledgement">Acknowledgement</CustomLink>
                    <CustomLink to="/contacts">Contacts</CustomLink>
                </Nav>
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
