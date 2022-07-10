import React, {Component, useEffect, useState} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ToastIn from "../components/Data/ToastIn";
import MyToast from "../components/Data/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faUndo, faSave, faPlusSquare, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link, MemoryRouter} from "react-router-dom";

export default class NewCharts extends Component{

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state = this.initialState2;
        this.dataChange = this.dataChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.submitData2 = this.submitData2.bind(this);

        this.state.show = false;
    }

    initialState = {
        id:'', incomes:'', value:'', date: ''
    }

    initialState2 = {
        idC:'', outcomes:'', valueC:'', dateC:''
    }


    componentDidMount = () => {
        var currentUrl = window.location.pathname.split('/');
        var location = currentUrl[2];
        if(location === "incomes"){
            this.findIncomesById(currentUrl[3]);
        }
        if(location === "outcomes"){
            this.findOutcomesById(currentUrl[3])
        }
    }

    findIncomesById = (incomesId) => {
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/incomes/"+incomesId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        incomes: response.data.incomes,
                        value: response.data.value,
                        date: response.data.date
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error)
        });
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

    resetData = () =>{
        this.setState(() => this.initialState)
    }

    resetData2 = () =>{
        this.setState(() => this.initialState2)
    }

    submitData = event => {

        event.preventDefault();

        const data = {
            incomes: this.state.incomes,
            value: this.state.value,
            date: this.state.date,
        };

        axios.post("https://chartsio.herokuapp.com/rest/add/incomes/"+ localStorage.getItem("login"), data)
            .then(res => {
                if(res.data != null){
                    this.setState({"myShow": true});
                    setTimeout(() => this.setState({"myShow":false}), 2000);
                }else{
                    this.setState({"myShow": false});
                }
            })
        this.setState(this.initialState);
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

    updateIncome = event => {
        event.preventDefault();
        const data = {
            id: this.state.id,
            incomes: this.state.incomes,
            value: this.state.value,
            date: this.state.date,
        };

        axios.put("https://chartsio.herokuapp.com/rest/update/in/"+ localStorage.getItem("login") +"/"+data.id, data)
            .then(res => {
                if(res.data != null){
                    this.setState({"myShow": true, "method":"put"});
                    setTimeout(() => this.setState({"myShow":false}), 2000);
                    setTimeout(() => window.location.href = "http://localhost:3000/results", 2000);
                }else{
                    this.setState({"myShow": false});
                }
            })
        this.setState(this.initialState);
    };

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
                    setTimeout(() => window.location.href = "http://localhost:3000/results", 2000);
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
            <Col>
                <div>
                    <div style={{"display":this.state.myShow ? "block" : "none"}}>
                        <MyToast children={{myShow:this.state.myShow, message: this.state.method === "put" ? "Incomes Updated Successfully" : "Incomes Saved Successfully"}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Incomes" : "Add Incomes"}
                        </Card.Header>
                        <Form onReset={this.resetData} onSubmit={this.state.id ? this.updateIncome : this.submitData} id="dataFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formIncomesTitle">
                                            <Form.Label>Incomes</Form.Label>
                                            <Form.Control required type="text" name="incomes" autoComplete="off"        //autoComplete -> suggest value
                                                          value={this.state.incomes}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter income" />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Col} controlId="formIncomesValue">
                                            <Form.Label>Value</Form.Label>
                                            <Form.Control required type="text" name="value" autoComplete="off"
                                                          value={this.state.value}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter value" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br/>
                                <Form.Group as={Col} controlId="formIncomesDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                                  value={this.state.date}
                                                  onChange={event => this.setState({date: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                                </Button>{'  '}
                                <Button size="sm" variant="info" type="reset" name="InReset">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{" "}
                                <Link to={"/results"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Incomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>,

                <div>
                    <div style={{"display":this.state.show ? "block" : "none"}}>
                        <ToastIn children={{show:this.state.show, message: this.state.method === "put" ? 'Outcomes Updated Successfully':'Outcomes Saved Successfully'}}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={this.state.idC ? faEdit : faPlusSquare}/> {this.state.idC ? "Update Outcomes" : "Add Outcomes"}
                        </Card.Header>
                        <Form onReset={this.resetData2} onSubmit={this.state.idC ? this.updateOutcome : this.submitData2} id="dataFormId">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col}>
                                            <Form.Label>Outcomes</Form.Label>
                                            <Form.Control required type="text" name="outcomes" autoComplete="off"
                                                          value={this.state.outcomes}
                                                          onChange={this.dataChange}
                                                          className={"bg-dark text-white"}
                                                          placeholder="Enter outcome" />
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
                                <Link to={"/results"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Outcomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
            </Col>


        );
    }
}