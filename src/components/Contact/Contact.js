import React from "react";
import {Chart} from "react-google-charts";
import {Button, Card, Table} from "react-bootstrap";
import "../../index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";

class Contact extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dataColumn: [
                ["Element", "Density", { role: "style" }],
                ["Zakupy", 80, "#b87333"], // RGB value
                ["Paliwo", 77, "silver"], // English color name
                ["Opłaty", 58, "gold"],
                ["Mandat", 64, "color: #e5e4e2"], // CSS-style declaration
            ],
            data: [
                ["Task", "Hours per Day"],
                ["Wypłata", 90],
                ["Prezent",  42],
                ["Nagroda",  25],
                ["Prowizja",  45],
                ["Bonus",  77],
            ],
            dataLine: [
                ["Year", "Przychody", "Wydatki"],
                ["2004", 1000, 400],
                ["2005", 1170, 460],
                ["2006", 660, 1120],
                ["2007", 1030, 540],
            ]
        };
    }

   Random = (max) => {
       return Math.floor(Math.random() * max);
   }

   data = (numb) => {
       const dataColumns= [
           ["Element", "Density", { role: "style" }],
           ["Zakupy", this.Random(numb), "#b87333"], // RGB value
           ["Paliwo", this.Random(numb), "silver"], // English color name
           ["Opłaty", this.Random(numb), "gold"],
           ["Mandat", this.Random(numb), "color: #e5e4e2"], // CSS-style declaration
       ];
        return dataColumns;
   }

    data1 = (numb) => {
        const data= [
            ["Task", "Hours per Day"],
            ["Wypłata", this.Random(numb)],
            ["Prezent",  this.Random(numb)],
            ["Nagroda",  this.Random(numb)],
            ["Prowizja",  this.Random(numb)],
            ["Bonus",  this.Random(numb)],
        ];
        return data;
    }

    data2 = (numb) => {
        const dataLine= [
            ["Year", "Przychody", "Wydatki"],
            ["2004",  this.Random(numb),  this.Random(numb)],
            ["2005",  this.Random(numb),  this.Random(numb)],
            ["2006",  this.Random(numb),  this.Random(numb)],
            ["2007",  this.Random(numb),  this.Random(numb)],
        ];
        return dataLine;
    }

   Randomize = () => {
       this.setState({dataColumn: this.data(100)})
   }

    Randomize1 = () => {
        this.setState({data: this.data1(100)})
    }

    Randomize2 = () => {
        this.setState({dataLine: this.data2(100)})
    }

   optionsColumn = {
    title: "Zestawienie wydatków",
    backgroundColor: '#EEEEEE',
};

    options = {
    title: "Zestawienie przychodów",
    backgroundColor: '#EEEEEE',
};

    optionsLine = {
        title: "Porównanie przychodów z wydatkami na przestrzeni lat",
        curveType: "function",
        legend: {position: "bottom"},
        backgroundColor: '#EEEEEE',
    }

    render() {

        return (
            <Card className={"border border-dark bg-dark text-white centerCard"} style={{ width: '80rem' }}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faList} /> Charts example
                    </div>
                </Card.Header>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <Card.Body>
                        <Table borderless={true}>
                            <tbody>
                            <tr>
                                <th width={1200}>
                                    <Chart chartType="ColumnChart" width="100%" height="500px" data={this.state.dataColumn} options={this.optionsColumn} />
                                    <Button onClick={this.Randomize}>Randomize</Button>
                                </th>
                            </tr>
                            </tbody>
                        </Table>

                        <Table borderless={true}>
                            <tbody>
                            <tr>
                                <th width={1200}>
                                    <Chart
                                        chartType="PieChart"
                                        data={this.state.data}
                                        options={this.options}
                                        width={"100%"}
                                        height={"500px"}
                                    />
                                    <Button onClick={this.Randomize1}>Randomize</Button>
                                </th>
                            </tr>
                            </tbody>
                        </Table>

                        <Table borderless={true}>
                            <tbody>
                            <tr>
                                <th width={1200}>
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="500px"
                                        data={this.state.dataLine}
                                        options={this.optionsLine}
                                    />
                                    <Button onClick={this.Randomize2}>Randomize</Button>
                                </th>
                                {/*<th>*/}
                                {/*    <tr><Col>*/}
                                {/*        <Button>Randomize</Button>*/}
                                {/*    </Col></tr>*/}
                                {/*</th>*/}
                            </tr>
                            </tbody>
                        </Table>
                        <br/>
                    </Card.Body>
                    </thead>
                </Table>
            </Card>
        );
    }
}

export default Contact;