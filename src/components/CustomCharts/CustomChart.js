import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faList, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Chart} from "react-google-charts";
import "../../index.css"
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import axios from "axios";
import {CSVLink} from 'react-csv';

class CustomChart extends React.Component {

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.dataChange = this.dataChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    initialState = {
        title:'', dateSince:'', dateTo:'', uniqueIncomes: [], uniqueOutcomes: [], chart: '', budget: '', temp: false, sumIncomes: '', sunOutcomes: '',
        yearIncomes: [], yearOutcomes: [], dateStack: []
    }

    submitData = event => {
        event.preventDefault();
        const tempArrIn = []
        const tempArrOut = []
        const tempDateStack = []

        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/in/exact?dateSince="+this.state.dateSince+"&dateTo="+this.state.dateTo)
            .then(response => response.data)
            .then((data) => {
                this.setState({"uniqueIncomes" : data});
            });

        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/out/exact?dateSince="+this.state.dateSince+"&dateTo="+this.state.dateTo)
            .then(response => response.data)
            .then((data) => {
                this.setState({"uniqueOutcomes" : data});
            });

        for(let localDate = this.state.dateSince.split('-')[0]; localDate <= this.state.dateTo.split('-')[0]; localDate++){
            axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/incomes/year?date="+localDate+"-01-01")
                .then(response => response.data)
                .then((data) => {
                    this.setState({"sumIncomes" : data});
                    tempArrIn.push(this.state.sumIncomes)
                    tempDateStack.push(localDate)
                });
        }

        for(let localDate = this.state.dateSince.split('-')[0]; localDate <= this.state.dateTo.split('-')[0]; localDate++){
            axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/outcomes/year?date="+localDate+"-01-01")
                .then(response => response.data)
                .then((data) => {
                    this.setState({"sumOutcomes" : data});
                    tempArrOut.push(this.state.sumOutcomes)
                });
        }

        this.setState({"dateStack" : tempDateStack})
        this.setState({"yearIncomes" : tempArrIn})
        this.setState({"yearOutcomes" : tempArrOut})
        this.setState({"temp": true})
    }

    resetData = () =>{
        this.setState(() => this.initialState)
    }

    generateChart() {
        if(this.state.chart === '' || this.state.temp === false){
            return (
                <div>

                </div>
            )
        }else {
            if(this.state.budget === "1"){
                return(
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={this.putUniqueDataIncomes(this.state.uniqueIncomes)}
                            options={{title: this.state.title}}
                            width={"100%"}
                            height={"500px"}
                        />
                        <CSVLink data={this.putUniqueDataIncomes(this.state.uniqueIncomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            } else if(this.state.budget === "2"){
                return(
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)}
                            options={{title: this.state.title}}
                            width={"100%"}
                            height={"500px"}
                        />
                        <CSVLink data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }else{
                return(
                    <h3 className={"text-white centerText "}>No data</h3>
                )
            }
        }
    }

    generateChart2() {
        if(this.state.chart === '' || this.state.temp === false){
            return (
                <div>

                </div>
            )
        }else {
            if(this.state.budget === "1"){
                return(
                    <div>
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="500px"
                            options={{title: this.state.title}}
                            data={this.putUniqueDataIncomes(this.state.uniqueIncomes)}
                        />
                        <CSVLink data={this.putUniqueDataIncomes(this.state.uniqueIncomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            } else if(this.state.budget === "2"){
                return (
                    <div>
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="500px"
                            options={{title: this.state.title}}
                            data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)}
                        />
                        <CSVLink data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }else{
                return(
                    <h3 className={"text-white centerText "}>No data</h3>
                )
            }
        }
    }

    generateChart3() {
        if(this.state.chart === '' || this.state.temp === false){
            return (
                <div>

                </div>
            )
        }else {
            if(this.state.budget === "1"){
                return(
                    <div>
                        <h3 className={"text-white centerChart"}>{this.state.title}</h3>
                        <Chart
                            chartType="BarChart"
                            width="100%"
                            height="600px"
                            options={{
                                hAxis: { minValue: 0, maxValue: 60 },
                                chartArea: { top: 0, right: 0, bottom: 0 },
                            }}
                            chartPackages={["corechart", "controls"]}
                            controls={[
                                {
                                    controlType: "NumberRangeFilter",
                                    options: {
                                        filterColumnIndex: 1,
                                        minValue: 0,
                                        maxValue: 100000,
                                    },
                                },
                            ]}
                            data={this.putUniqueDataIncomes(this.state.uniqueIncomes)}
                        />
                        <br/>
                        <CSVLink data={this.putUniqueDataIncomes(this.state.uniqueIncomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            } else if(this.state.budget === "2"){
                return (
                    <div>
                        <h3 className={"text-white centerChart"}>{this.state.title}</h3>
                        <Chart
                            chartType="BarChart"
                            width="100%"
                            height="600px"
                            options={{
                                hAxis: { minValue: 0, maxValue: 60 },
                                chartArea: { top: 0, right: 0, bottom: 0 },
                            }}
                            chartPackages={["corechart", "controls"]}
                            controls={[
                                {
                                    controlType: "NumberRangeFilter",
                                    options: {
                                        filterColumnIndex: 1,
                                        minValue: 0,
                                        maxValue: 100000,
                                    },
                                },
                            ]}
                            data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)}
                        />
                        <br/>
                        <CSVLink data={this.putUniqueDataOutcomes(this.state.uniqueOutcomes)} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }else{
                return(
                    <h3 className={"text-white centerText "}>No data</h3>
                )

            }
        }
    }

    generateChart4(){
        if(this.state.chart === '' || this.state.temp === false){
            return (
                <div>

                </div>
            )
        }else {
            if(this.state.budget === "1"){
                return(
                    <div>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="500px"
                            options={{
                                chart: {
                                    title: this.state.title,
                                    subtitle: "Period: "+ this.state.dateSince+" to "+this.state.dateTo,
                                }
                            }}
                            data={this.putUniqueDataIncomesDouble()}
                        />
                        <CSVLink data={this.putUniqueDataIncomesDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            } else if(this.state.budget === "2"){
                return (
                    <div>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="500px"
                            options={{
                                chart: {
                                    title: this.state.title,
                                    subtitle: "Period: "+ this.state.dateSince+" to "+this.state.dateTo,
                                }
                            }}
                            data={this.putUniqueDataOutcomesDouble()}
                        />
                        <CSVLink data={this.putUniqueDataOutcomesDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }else{
                return (
                    <div>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="500px"
                            options={{
                                chart: {
                                    title: this.state.title,
                                    subtitle: "Period: "+ this.state.dateSince+" to "+this.state.dateTo,
                                }
                            }}
                            data={this.putUniqueDataDouble()}
                        />
                        <CSVLink data={this.putUniqueDataDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }
        }
    }

    generateChart5(){
        if(this.state.chart === '' || this.state.temp === false){
            return (
                <div>

                </div>
            )
        }else {
            if(this.state.budget === "1"){
                return(
                    <div>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="500px"
                            options={{
                                title: this.state.title,
                                curveType: "function",
                                legend: {position: "bottom"}
                            }}
                            data={this.putUniqueDataIncomesDouble()}
                        />
                        <CSVLink data={this.putUniqueDataIncomesDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            } else if(this.state.budget === "2"){
                return (
                    <div>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="500px"
                            options={{
                                title: this.state.title,
                                curveType: "function",
                                legend: {position: "bottom"}
                            }}
                            data={this.putUniqueDataOutcomesDouble()}
                        />
                        <CSVLink data={this.putUniqueDataOutcomesDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }else{
                return (
                    <div>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="500px"
                            options={{
                                title: this.state.title,
                                curveType: "function",
                                legend: {position: "bottom"}
                            }}
                            data={this.putUniqueDataDouble()}
                        />
                        <CSVLink data={this.putUniqueDataDouble()} filename={this.state.title} separator={";"}>
                            <Button variant="success" type="submit">Save as CSV</Button>
                        </CSVLink>
                    </div>
                )
            }
        }
    }

    putUniqueDataIncomes(uniqueValue) {
        const ans = []
        ans.push(["Incomes", "Value"])

        uniqueValue.map((data) =>
            ans.push([data.incomes, data.value])
        )
        console.log(ans)
        return ans
    }

    putUniqueDataOutcomes(uniqueValue) {
        const ans = []
        ans.push(["Incomes", "Value"])

        uniqueValue.map((data) =>
            ans.push([data.outcomes, data.value])
        )
        console.log(ans)
        return ans
    }

    putUniqueDataDouble() {
        const ans = []
        ans.push(["Date", "Incomes", "Outcomes"])

        for(let i = 0; i<this.state.yearIncomes.length; i++){
            ans.push([this.state.dateStack[i], this.state.yearIncomes[i], this.state.yearOutcomes[i]])
        }

        console.log("to jest ans " + ans)
        return ans
    }

    putUniqueDataIncomesDouble() {
        const ans = []
        ans.push(["Date", "Incomes"])

        for(let i = 0; i<this.state.dateStack.length; i++){
            ans.push([this.state.dateStack[i], this.state.yearIncomes[i]])
        }

        console.log("to jest ans " + ans)
        return ans
    }

    putUniqueDataOutcomesDouble() {
        const ans = []
        ans.push(["Date", "Outcomes"])

        for(let i = 0; i<this.state.dateStack.length; i++){
            ans.push([this.state.dateStack[i], this.state.yearOutcomes[i]])
        }

        console.log("to jest ans " + ans)
        return ans
    }

    dataChange = event =>{
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
    }

    selectChart(){
        if(this.state.chart === "1"){
            return (this.generateChart())
        }
        if(this.state.chart === "2"){
            return (this.generateChart2())
        }
        if(this.state.chart === "3"){
            return (this.generateChart3())
        }
        if(this.state.chart === "4"){
            return (this.generateChart4())
        }
        if(this.state.chart === "5"){
            return (this.generateChart5())
        }
    }

    render() {

        return (
            <Card className={"border border-dark bg-dark text-white centerCard"} style={{ width: '70rem' }}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faChartLine} /> Make Your own Chart
                    </div>
                </Card.Header>
                <br/>
                <Card className={"border-secondary bg-dark text-white centerCard"} style={{ width: '60rem' }}>
                    <Card.Header>
                        <Row>
                            <div style={{"float":"left"}}>
                                <FontAwesomeIcon icon={faList} /> Charts Panel
                            </div>
                        </Row>
                    </Card.Header>
                    <Form onReset={this.resetData} onSubmit={this.submitData}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label className={"text-white"}>Title of the chart</Form.Label>
                                    <Form.Control required type="text" name="incomes" autoComplete="off"        //autoComplete -> suggest value
                                                  value={this.state.title}
                                                  onChange={event => this.setState({title: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter title of Your chart" />
                                </Col>
                                <Col>
                                    <Form.Label className={"text-white"}>Date Since</Form.Label>
                                    <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                                  value={this.state.dateSince}
                                                  onChange={event => this.setState({dateSince: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Col>
                                <Col>
                                    <Form.Label className={"text-white"}>Date To</Form.Label>
                                    <Form.Control required type="date" formControlName="startDate" autoComplete="off"
                                                  value={this.state.dateTo}
                                                  onChange={event => this.setState({dateTo: event.target.value})}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date" />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Select required aria-label="Charts Categories"
                                                 onChange={event => this.setState({chart: event.target.value})}>
                                        <option>Chart Categories...</option>
                                        <option value="1">Pie Chart</option>
                                        <option value="2">Column Chart</option>
                                        <option value="3">Number Range Chart</option>
                                        <option value="4">Bar Chart</option>
                                        <option value="5">Line Chart</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select required aria-label="Charts Categories"
                                                 onChange={event => this.setState({budget: event.target.value})}>
                                        <option>Budget Categories...</option>
                                        <option value="1">Incomes</option>
                                        <option value="2">Expenses</option>
                                        <option value="3">Incomes && Expenses</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Form>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size={"sm"} variant="success" type="submit" onClick={this.submitData}><FontAwesomeIcon icon={faCheck} /> Submit</Button>
                        {" "}
                        <Button size={"sm"} variant="info" type="reset" name="InReset" onClick={this.resetData}><FontAwesomeIcon icon={faUndo} /> Reset</Button>
                    </Card.Footer>
                </Card>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <Card.Body>
                        <div>
                            {this.selectChart()}
                        </div>
                    </Card.Body>
                    </thead>
                </Table>
                <br/>
                <br/>
            </Card>
        );
    }
}

export default CustomChart;
