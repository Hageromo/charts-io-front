import React, {Component} from "react";
import {Button, ButtonGroup, Card, Col, Table} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import ToastIn from "../Data/ToastIn";
import MyToast from "../Data/MyToast";
import {Link} from "react-router-dom";


export default class Results extends Component{

    constructor(props){
        super(props);
        this.state={
            user : []
        };
    }

    componentDidMount(){
        this.findAllData();
    }

    findAllData(){
        axios.get("https://chartsio.herokuapp.com/rest/" + localStorage.getItem("login"))
            .then(response => response.data)
            .then((data) => {
                this.setState({user : data});
            });
    }

    deleteIncomes = (id) => {
      axios.delete("https://chartsio.herokuapp.com/rest/delete/in/"+ localStorage.getItem("login") +"/"+id)
          .then(response => {
              if(response.data != null){
                  this.setState({"myShow": true});
                  setTimeout(() => this.setState({"myShow":false}), 2000);
                  this.setState(this.findAllData())

              }else{
                  this.setState({"myShow": false});
              }
          })
    };

    deleteOutcomes = (id) => {
        axios.delete("https://chartsio.herokuapp.com/rest/delete/out/"+ localStorage.getItem("login") +"/"+id)
            .then(response => {
                if(response.data != null){
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show":false}), 2000);
                    this.setState(this.findAllData())

                }else{
                    this.setState({"show": false});
                }
            })
    };


    
    render(){
        return(

            <Col>
                <div>
                    <div style={{"display":this.state.myShow ? "block" : "none"}}>
                        <MyToast children={{myShow:this.state.myShow, message: "Incomes Deleted Successfully"}}/>
                        {/*<ToastIn show={this.state.show} message={'Outcomes Deleted Successfully'} type={"danger"}/>*/}
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faList} /> Results
                        </Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Incomes</th>
                                    <th>Values</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.user.incomes == null ?
                                    <tr align="center">
                                        <td colSpan="6">No data</td>
                                    </tr>:

                                    this.state.user.incomes.map((users) => (
                                        <tr key={users.id}>
                                            <td>{users.incomes}</td>
                                            <td>{users.value}</td>
                                            <td>{users.date}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"/edit/incomes/"+users.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                    <Button size={"sm"} variant="outline-danger"  onClick={() => this.deleteIncomes(users.id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>,
                <div>
                    <div style={{"display":this.state.show ? "block" : "none"}}>
                        <ToastIn children={{show:this.state.show, message:'Outcomes Deleted Successfully'}}/>
                    </div>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Results
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Outcomes</th>
                                <th>Values</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.user.outcomes == null ?
                                <tr align="center">
                                    <td colSpan="6">No data</td>
                                </tr>:

                                this.state.user.outcomes.map((users) => (
                                    <tr key={users.id}>
                                        <td>{users.outcomes}</td>
                                        <td>{users.value}</td>
                                        <td>{users.date}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/edit/outcomes/"+users.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                <Button size={"sm"} variant="outline-danger" onClick={() => this.deleteOutcomes(users.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

}

