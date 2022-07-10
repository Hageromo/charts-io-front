import React, {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import "../../App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {logoutUser} from "../Login/auth/authActions";
import {connect} from "react-redux";
import "../../index.css"

class NavigationBar extends Component{

    logout = () => {
        this.props.logoutUser();
        localStorage.removeItem('state')
        localStorage.removeItem('login')
    }

    refresh() {
        setTimeout(() =>  window.location.reload(), 1);
    }
    render(){
        const guestLinks = (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand active">
                    <Navbar.Brand className="nav-link active">Charts.io</Navbar.Brand>
                </Link>

                <Nav className="mr-auto">
                    <Link to={""} className="nav-link active">Home</Link>
                    <Link to={"contact"} className="nav-link active">Demo</Link>
                </Nav>
                <Nav className="ms-auto">
                    <Link to={"/login"} className="nav-link active"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                    <Link to={"/register"} className="nav-link active"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                </Nav>
            </Navbar>
        );
        const userLinks = (
            <Navbar bg="dark" variant="dark"> {/*fixed="top"*/}
                <Link to={""} className="navbar-brand" >
                    <Navbar.Brand bsPrefix={"activeLogo"}>Charts.io</Navbar.Brand>
                </Link>

                <Nav className="mr-auto">
                    <Link to={""} className="nav-link active">Home</Link>
                    <Link to={"custom"} className="nav-link active">Custom Chart</Link>
                    <Link to={"charts"} className="nav-link active" onClick={this.refresh}>List of Charts</Link>
                    <NavDropdown active={true} menuVariant="dark" title={"Add new value"} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"new/incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"new/outcomes"} style={{ fontSize: '95%' }}>Expenses</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown active={true} menuVariant="dark" title={"Results"} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"outcomes"} style={{ fontSize: '95%' }}>Expenses</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ms-auto">
                    <Link to={"/logout"} className="nav-link text-white active" onClick={this.logout}><FontAwesomeIcon icon={faSignInAlt}/> Logout: {localStorage.getItem("login")}</Link>,
                </Nav>
            </Navbar>
        );
        const test = (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <Navbar.Brand className="nav-link">Charts.io</Navbar.Brand>
                </Link>

                <Nav className="mr-auto">
                    <Link to={""} className="nav-link">Home</Link>
                    <Link to={"contact"} className="nav-link">Demo</Link>
                    <Link to={"charts"} className="nav-link">List of charts</Link>
                    <NavDropdown title="Add new value" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"new/incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"new/outcomes"} style={{ fontSize: '95%' }}>Outcomes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={"new"} style={{ fontSize: '95%' }}>Test czy zostaje?</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Results" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"incomes"} style={{ fontSize: '95%' }}>Incomes</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"outcomes"} style={{ fontSize: '95%' }}>Outcomes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={"results"} style={{ fontSize: '95%' }}>All Results</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ms-auto">
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                    <Link to={"/register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                </Nav>
            </Navbar>
        );

        return(
            <div>
                {this.props.auth.isLoggedIn || localStorage.getItem('state') ? userLinks : guestLinks}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

