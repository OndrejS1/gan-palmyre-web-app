import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {Container, Nav, Navbar} from "react-bootstrap";
import {t} from "../i18n";

function NavbarMenu() {
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
                        />{t('logo')}</CustomLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <CustomLink to="/">{t('navbarMenu.home')}</CustomLink>
                        <CustomLink to="/about">{t('navbarMenu.about')}</CustomLink>
                        <CustomLink to="/gallery">{t('navbarMenu.gallery')}</CustomLink>
                        <CustomLink to="/acknowledgement">{t('navbarMenu.acknowledgement')}</CustomLink>
                        <CustomLink to="/contacts">{t('navbarMenu.contacts')}</CustomLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;

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
