import React, {Component} from "react";
import {Alert, Button, Card, Col, Form, FormControl, InputGroup, Row,} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo,} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "./auth/authActions";
import {connect} from "react-redux";
import axios from "axios";


export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        email: '', password: '', error: '', wasLogged: false
    }

    resetLogin = () => {
        this.setState(() => this.initialState)
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    validateUser = () => {

        axios.get("https://chartsio.herokuapp.com/rest/"+ this.state.email +"/" + this.state.password)
            .then((resp) => {
                if(resp.status === 201){
                    this.state.wasLogged = true
                    localStorage.setItem("state", this.state.wasLogged)
                    localStorage.setItem("login", this.state.email)
                    window.location.assign("http://localhost:3000/");
                }
            })
            .catch(() => {
                this.resetLogin();
                this.setState({"error": "Invalid Login or Password"})
            })
    };

    render() {
        const {email, password, error} = this.state

        return(
            <Row className="justify-content-md-center">
                <div className={"mb-5"}> </div>
                <Col xs={6}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header className="mb-2">
                              <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <InputGroup size="sm" className={"mb-4"}>
                                    <Form.Group>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </InputGroup.Text>
                                    </Form.Group>
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.credentialChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Login"/>
                                </InputGroup>

                                <Form.Group as={Col} className="mb-3">
                                    <InputGroup>
                                        <Form.Group>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon size="lg" icon={faLock}/>
                                            </InputGroup.Text>
                                        </Form.Group>
                                        <FormControl
                                            size="sm"
                                            required
                                            autoComplete="off"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={this.credentialChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm"
                                    type="button"
                                    variant="success"
                                    onClick={this.validateUser}
                                    disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Button>{' '}
                            <Button size="sm"
                                    type="button"
                                    variant="info"
                                    onClick={this.resetLogin}
                                    disabled={this.state.email.length === 0 && this.state.password.length === 0 && this.state.error.length === 0}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
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
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
