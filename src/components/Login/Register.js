import React, {Component} from "react";
import {Alert, Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.submitData = this.submitData.bind(this);
    }

    initialState = {
        userName: '', email: '', password: '', error: '', wasLogged: false
    }

    resetLogin = () => {
        this.setState(() => this.initialState)
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    submitData = () => {

        const data = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
        };

        axios.post("https://chartsio.herokuapp.com/rest/add", data)
            .then(res => {
                if(res.status === 201){
                    if(res.data.password.length < 4){
                        this.resetLogin();
                        this.setState({"error": "Password too short"})
                    }else{
                        window.location.assign("http://localhost:3000/login");
                    }
                }
            })
            .catch(() => {
                this.resetLogin();
                this.setState({"error": "Email or Login already taken"})
            })

        this.setState(this.initialState);
    }

    render() {
        const {email, password, userName} = this.state

        return(
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <div className={"mb-4"}> </div>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header className="mb-2">
                            <FontAwesomeIcon icon={faSignInAlt}/> Register
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <InputGroup size="sm" className={"mb-4"}>
                                    <Form.Group>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroup.Text>
                                    </Form.Group>
                                    <FormControl
                                        required
                                        autoComplete="on"
                                        type="userName"
                                        name="userName"
                                        value={userName}
                                        onChange={this.credentialChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter User Name"/>
                                </InputGroup>

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
                                        placeholder="Enter Email Address"/>
                                </InputGroup>

                                <InputGroup size="sm" className={"mb-4"}>
                                    <Form.Group>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock} />
                                        </InputGroup.Text>
                                    </Form.Group>
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.credentialChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Password"/>
                                </InputGroup>
                            </Form>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm"
                                    type="button"
                                    variant="success"
                                    onClick={this.submitData}
                                    disabled={this.state.email.length === 0 || this.state.password.length === 0 || this.state.userName.length === 0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info"  onClick={this.resetLogin}
                                    disabled={this.state.email.length === 0 && this.state.password.length === 0 && this.state.userName.length === 0}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Register;