import React from "react";
import {Chart} from "react-google-charts";
import {Card, Dropdown, DropdownButton, InputGroup, Table} from "react-bootstrap";
import "../../index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);


class ChartsList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            incomes: 0,
            outcomes: 0,
            uniqueIncomes: [],
            uniqueOutcomes: [],
            maxValue: 9500,
            incomesStatus: true,
            outcomesStatus: true,
            pieStatus: true,
            columnStatus: true,
        };
    }

    componentDidMount(){
        this.getAllIncomes();
        this.getAllOutcomes();
        this.getAllUniqueIncomes();
        this.getAllUniqueOutcomes();
    }

    getAllIncomes(){
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/incomes")
            .then(response => response.data)
            .then((data) => {
                this.setState({incomes : data});
            });
    }

    getAllOutcomes(){
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/outcomes")
            .then(response => response.data)
            .then((data) => {
                this.setState({outcomes : data});
            });
    }

    getAllUniqueIncomes(){
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/unique/incomes")
            .then(response => response.data)
            .then((data) => {
                this.setState({uniqueIncomes : data});
            });
    }

    getAllUniqueOutcomes(){
        axios.get("https://chartsio.herokuapp.com/rest/"+ localStorage.getItem("login") +"/unique/outcomes")
            .then(response => response.data)
            .then((data) => {
                this.setState({uniqueOutcomes : data});
            });
    }


    putData() {
        return [
            ["Alpha", "Omega"],
            ["Przychody", this.state.incomes],
            ["Wydatki",  this.state.outcomes],
        ]
    }

    putDataColumn() {
        return [
            ["Element", "Value",  { role: "style" }],
            ["Przychody", this.state.incomes, "#3366CC"],
            ["Wydatki",  this.state.outcomes, "#DC3912"],
        ]
    }

    putUniqueData(uniqueValue) {
        const keys = Object.keys(uniqueValue)
        const values = Object.values(uniqueValue)
        const ans = []
        ans.push(["Alpha", "Omega"])

        for(let i = 0; i < keys.length; i++){
            ans.push([keys[i], values[i]])
        }
        return ans
    }

    putUniqueDataColumn(uniqueValue) {
        const keys = Object.keys(uniqueValue)
        const values = Object.values(uniqueValue)
        const ans = []
        ans.push(["Alpha", "Value", { role: "style" }])

        for(let i = 0; i < keys.length; i++){
            ans.push([keys[i], values[i], Math.floor(Math.random()*16777215).toString(16)])
        }
        return ans
    }

    putUniqueDataControl(uniqueValue) {
        const keys = Object.keys(uniqueValue)
        const values = Object.values(uniqueValue)
        const ans = []
        ans.push(["Name", "Value"])

        for(let i = 0; i < keys.length; i++){
            ans.push([keys[i], values[i]])
        }
        this.state.maxValue = Math.max(...values)
        return ans
    }

    options = {
        hAxis: { minValue: 0, maxValue: 60 },
        chartArea: { top: 0, right: 0, bottom: 0 },
        title: "User incomes range " + localStorage.getItem("login")
    };

    putDataControl(uniqueValue) {
        const keys = Object.keys(uniqueValue)
        const values = Object.values(uniqueValue)
        const ans = []
        ans.push(["Name", "Condition", "Value", "Instant"])

        for(let i = 0; i < keys.length; i++){
            if(values[i] <= 100){
                ans.push([keys[i], "less than 100" ,values[i], values[i]])
            }else if(values[i] >= 100 && values[i] <= 1000){
                ans.push([keys[i], "more than 100 less than 1000" ,values[i], values[i]])
            }else if(values[i] >= 1000 && values[i] <= 5000){
                ans.push([keys[i], "more than 1000 less than 5000",values[i], values[i]])
            }else{
                ans.push([keys[i], "more than 5000" ,values[i], values[i]])
            }
        }

        return ans
    }

    optionsSelection = {
        legend: "none",
        chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
        pieSliceText: "label",
    };

    returnCircle(statusChart, statusIn, statusOut) {
        if(statusChart === true && statusIn === true && statusOut === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="PieChart"
                                data={this.putData()}
                                options={{title: "Statement of incomes and expenses " + localStorage.getItem("login")}}
                                width={"95%"}
                                height={"500px"}
                                className={"centerChart"}
                            />
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnColumn(statusChart, statusIn, statusOut) {
        if(statusChart === true && statusIn === true && statusOut === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="ColumnChart"
                                width="95%"
                                height="500px"
                                data={this.putDataColumn()}
                                options={{title: "Statement of incomes and expenses " + localStorage.getItem("login")}}
                                className={"centerChart"}/>
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnIncomesCircle(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="PieChart"
                                data={this.putUniqueData(this.state.uniqueIncomes)}
                                options={{title: "Circle statement of incomes " + localStorage.getItem("login")}}
                                width={"95%"}
                                height={"500px"}
                                className={"centerChart"}
                            />
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnIncomesColumn(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="ColumnChart"
                                width="95%"
                                height="500px"
                                data={this.putUniqueDataColumn(this.state.uniqueIncomes)}
                                options={{title: "Column statement of incomes " + localStorage.getItem("login")}}
                                className={"centerChart"}/>
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnOutcomesPie(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="PieChart"
                                data={this.putUniqueData(this.state.uniqueOutcomes)}
                                options={{title: "Circle statement of expenses " + localStorage.getItem("login")}}
                                width={"95%"}
                                height={"500px"}
                                className={"centerChart"}
                            />
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnOutcomesColumn(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <Chart
                                chartType="ColumnChart"
                                width="95%"
                                height="500px"
                                data={this.putUniqueDataColumn(this.state.uniqueOutcomes)}
                                options={{title: "Column statement of expenses " + localStorage.getItem("login")}}
                                className={"centerChart"}/>
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnRangeIncomesColumn(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <h3 className={"text-white centerChart"}>User incomes range {localStorage.getItem("login")}</h3>
                            <Chart
                                chartType="BarChart"
                                width="95%"
                                height="500px"
                                data={this.putUniqueDataControl(this.state.uniqueIncomes)}
                                options={this.options}
                                chartPackages={["corechart", "controls"]}
                                controls={[
                                    {
                                        controlType: "NumberRangeFilter",
                                        options: {
                                            filterColumnIndex: 1,
                                            minValue: 0,
                                            maxValue: this.state.maxValue,
                                        },
                                    },
                                ]}
                                className={"centerChart"}/>
                        </th>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    returnRangeOutcomesColumn(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <h3 className={"text-white centerChart"}>User expenses range {localStorage.getItem("login")}</h3>
                            <Chart
                                chartType="BarChart"
                                width="95%"
                                height="500px"
                                data={this.putUniqueDataControl(this.state.uniqueOutcomes)}
                                options={this.options}
                                chartPackages={["corechart", "controls"]}
                                controls={[
                                    {
                                        controlType: "NumberRangeFilter",
                                        options: {
                                            filterColumnIndex: 1,
                                            minValue: 0,
                                            maxValue: this.state.maxValue,
                                        },
                                    },
                                ]}
                                className={"centerChart"}/>
                        </th>
                    </tr>
                    </tbody>
                    <br/>
                </Table>
            );
        }
    }

    returnRangeIncomesCircle(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <h3 className={"text-white centerChart"}>User incomes range {localStorage.getItem("login")}</h3>
                            <div className={"centerChart"}>
                                <Chart
                                    chartType="PieChart"
                                    width="97.5%"
                                    height="500px"
                                    data={this.putDataControl(this.state.uniqueIncomes)}
                                    options={this.optionsSelection}
                                    chartWrapperParams={{ view: { columns: [0, 3] } }}
                                    chartPackages={["corechart", "controls"]}
                                    controls={[
                                        {
                                            controlEvents: [
                                                {
                                                    eventName: "statechange",
                                                    callback: ({ chartWrapper, controlWrapper }) => {
                                                        console.log("State changed to", controlWrapper?.getState());
                                                    },
                                                },
                                            ],
                                            controlType: "CategoryFilter",
                                            options: {
                                                filterColumnIndex: 1,
                                                ui: {
                                                    labelStacking: "vertical",
                                                    label: "Gender Selection:",
                                                    allowTyping: false,
                                                    allowMultiple: false,
                                                },
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </th>
                    </tr>
                    </tbody>
                    <br/>
                    <br/>
                </Table>
            );
        }
    }

    returnRangeOutcomesCircle(statusChart, statusIn) {
        if(statusChart === true && statusIn === true) {
            return (
                <Table borderless={true}>
                    <tbody>
                    <tr>
                        <th width={1200}>
                            <h3 className={"text-white centerChart"}>User expenses range {localStorage.getItem("login")}</h3>
                            <div className={"centerChart"}>
                                <Chart
                                    chartType="PieChart"
                                    width="97.5%"
                                    height="500px"
                                    data={this.putDataControl(this.state.uniqueOutcomes)}
                                    options={this.optionsSelection}
                                    chartWrapperParams={{ view: { columns: [0, 3] } }}
                                    chartPackages={["corechart", "controls"]}
                                    controls={[
                                        {
                                            controlEvents: [
                                                {
                                                    eventName: "statechange",
                                                    callback: ({ chartWrapper, controlWrapper }) => {
                                                        console.log("State changed to", controlWrapper?.getState());
                                                    },
                                                },
                                            ],
                                            controlType: "CategoryFilter",
                                            options: {
                                                filterColumnIndex: 1,
                                                ui: {
                                                    labelStacking: "vertical",
                                                    label: "Gender Selection:",
                                                    allowTyping: false,
                                                    allowMultiple: false,
                                                },
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </th>
                    </tr>
                    </tbody>
                    <br/>
                    <br/>
                </Table>
            );
        }
    }

    setPieStatus = () => {
        this.setState({"pieStatus": true})
        this.setState({"columnStatus": false})
        this.setState({"incomesStatus": true})
        this.setState({"outcomesStatus": true})
    }

    setColumnStatus = () => {
        this.setState({"pieStatus": false})
        this.setState({"columnStatus": true})
        this.setState({"incomesStatus": true})
        this.setState({"outcomesStatus": true})
    }

    setIncomesStatus = () => {
        this.setState({"incomesStatus": true})
        this.setState({"pieStatus": true})
        this.setState({"columnStatus": true})
        this.setState({"outcomesStatus": false})
    }

    setOutcomesStatus = () => {
        this.setState({"outcomesStatus": true})
        this.setState({"pieStatus": true})
        this.setState({"columnStatus": true})
        this.setState({"incomesStatus": false})
    }

    setGlobalStatus = () => {
        this.setState({"outcomesStatus": true})
        this.setState({"pieStatus": true})
        this.setState({"columnStatus": true})
        this.setState({"incomesStatus": true})
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white centerCard"} style={{ width: '80rem' }}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faList} /> Charts prepared for You
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup className="mb-3">
                            <DropdownButton
                                variant="primary"
                                title="Charts Categories"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item href="#" type="button" onClick={this.setIncomesStatus}>Incomes</Dropdown.Item>
                                <Dropdown.Item href="#" type="button" onClick={this.setOutcomesStatus}>Expenses</Dropdown.Item>
                                <Dropdown.Item href="#" type="button" onClick={this.setGlobalStatus}>Incomes && Expenses</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#" type="button" onClick={this.setColumnStatus}>Column Charts</Dropdown.Item>
                                <Dropdown.Item href="#" type="button" onClick={this.setPieStatus}>Pie Charts</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </div>
                </Card.Header>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <Card.Body>
                        {this.returnCircle(this.state.pieStatus, this.state.incomesStatus, this.state.outcomesStatus)}
                        {this.returnColumn(this.state.columnStatus,this.state.incomesStatus, this.state.outcomesStatus)}
                        {this.returnIncomesCircle(this.state.incomesStatus, this.state.pieStatus)}
                        {this.returnOutcomesPie(this.state.outcomesStatus, this.state.pieStatus)}
                        {this.returnIncomesColumn(this.state.incomesStatus, this.state.columnStatus)}
                        {this.returnOutcomesColumn(this.state.outcomesStatus, this.state.columnStatus)}
                        {this.returnRangeIncomesColumn(this.state.incomesStatus, this.state.columnStatus)}
                        {this.returnRangeOutcomesColumn(this.state.outcomesStatus, this.state.columnStatus)}
                        {this.returnRangeIncomesCircle(this.state.incomesStatus, this.state.pieStatus)}
                        {this.returnRangeOutcomesCircle(this.state.outcomesStatus, this.state.pieStatus)}
                        <br/>
                    </Card.Body>
                    </thead>
                </Table>
            </Card>
        );
    }
}

export default ChartsList;