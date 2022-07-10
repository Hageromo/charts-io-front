import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from 'axios';
import ToastIn from "../Data/ToastIn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class NewOutcomes extends Component{

    constructor(props){
        super(props);
        this.state = this.initialState2;
        this.dataChange = this.dataChange.bind(this);
        this.submitData2 = this.submitData2.bind(this);

        this.state.show = false;
    }


    initialState2 = {
        idC:'', outcomes:'', valueC:'', dateC:''
    }


    componentDidMount = () => {
        var currentUrl = window.location.pathname.split('/');
        console.log(window.location.pathname.split('/'))
        var location = currentUrl[2];

        if(location === "outcomes"){
            this.findOutcomesById(currentUrl[3])
        }
    }

    findOutcomesById = (outcomesId) => {
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/outcomes/"+outcomesId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        idC: response.data.id,
                        outcomes: response.data.outcomes,
                        valueC: response.data.value,
                        dateC: response.data.date
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error)
        });
    }

    resetData2 = () =>{
        this.setState(() => this.initialState2)
    }

    submitData2 = event => {

        event.preventDefault();

        const dataCosts = {
            outcomes: this.state.outcomes,
            value: this.state.valueC,
            date: this.state.dateC,
        };

        axios.post("https://chartsio.herokuapp.com/rest/add/outcomes/"+ localStorage.getItem("login"), dataCosts)
            .then(res => {
                if(res.data != null){
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show":false}), 2000);
                }else{
                    this.setState({"show": false});
                }
            })
        this.setState(this.initialState2);
    }

    updateOutcome = event => {
        event.preventDefault();
        const data = {
            id: this.state.idC,
            outcomes: this.state.outcomes,
            value: this.state.valueC,
            date: this.state.dateC,
        };

        axios.put("https://chartsio.herokuapp.com/rest/update/out/"+ localStorage.getItem("login") +"/"+data.id, data)
            .then(res => {
                if(res.data != null){
                    this.setState({"show": true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 2000);
                    setTimeout(() => window.location.href = "http://localhost:3000/outcomes", 2000);
                }else{
                    this.setState({"show": false});
                }
            })
        this.setState(this.initialState2);
    };

    dataChange = event =>{
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
    }

    render(){
        return(
                <div>
                    <div style={{"display":this.state.show ? "block" : "none"}}>
                        <ToastIn children={{show:this.state.show, message: this.state.method === "put" ? 'Outcomes Updated Successfully':'Outcomes Saved Successfully'}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={this.state.idC ? faEdit : faPlusSquare}/> {this.state.idC ? "Update Expenses" : "Add Expenses"}
                        </Card.Header>
                        <Form onReset={this.resetData2} onSubmit={this.state.idC ? this.updateOutcome : this.submitData2} id="dataFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col}>
                                            <Form.Label>Expenses</Form.Label>
                                            <Form.Control required type="text" name="outcomes" autoComplete="off"
                                                          value={this.state.outcomes}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter expenses" />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Col} controlId="formOutcomesValue">
                                            <Form.Label>Value</Form.Label>
                                            <Form.Control required type="text" name="valueC" autoComplete="off"
                                                          value={this.state.valueC}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter value" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br/>
                                <Form.Group as={Col}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date" autoComplete="off"
                                                  value={this.state.dateC}
                                                  onChange={event => this.setState({dateC: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} /> {this.state.idC ? "Update" : "Save"}
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset" name="OutReset">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{" "}
                                <Link to={"/outcomes"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Outcomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
        );
    }
}