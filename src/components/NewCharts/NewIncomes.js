import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from 'axios';
import MyToast from "../Data/MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import "../../idk/charts.css"

export default class NewIncomes extends Component{

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitData = this.submitData.bind(this);

        this.state.show = false;
    }

    initialState = {
        id:'', incomes:'', value:'', date: ''
    }


    componentDidMount = () => {
        var currentUrl = window.location.pathname.split('/');
        var location = currentUrl[2];
        if(location === "incomes"){
            this.findIncomesById(currentUrl[3]);
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


    resetData = () =>{
        this.setState(() => this.initialState)
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
                    setTimeout(() => window.location.href = "http://localhost:3000/incomes", 2000);
                }else{
                    this.setState({"myShow": false});
                }
            })
        this.setState(this.initialState);
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
                                <Link to={"/incomes"} className="btn btn-sm btn-primary text-white" ><FontAwesomeIcon icon={faList} /> Incomes List</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
        );
    }
}