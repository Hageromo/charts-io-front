import React, {Component} from "react";
import {Card, Carousel, Col} from "react-bootstrap";
import {Chart} from "react-google-charts";
import "../../idk/charts.css"


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let data = [
    ["Task", "Hours per Day"],
    ["Work", getRandomInt(1000)],
    ["Eat",  getRandomInt(1000)],
    ["Commute",  getRandomInt(1000)],
    ["Watch TV",  getRandomInt(1000)],
    ["Sleep",  getRandomInt(1000)],
];

export const options = {
    title: "My Daily Activities",
    // backgroundColor: '#EEEEEE',
    // titleTextStyle: {color: 'white'},
    // legendTextStyle: {color: 'white'},
};

export const dataMyLine = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
];

export const optionsMyLine = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
    // backgroundColor: '#EEEEEE',
};

export const dataBar = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];
export const optionsBar = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses  , and Profit: 2014-2017",
    },
};

export const Js2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function ControlledCarousel() {
    return (
        <Card className={"border border-dark backColor3 text-white centerCard"}>
            <Card.Header className={"centerText textSize text-white"}>Sample charts You can create on this page</Card.Header>
            <Card.Body className={"borderless"} variant={"dark"}>
                <Card className={"borderless backColor3 text-white centerCard"}>
                    <Chart
                        chartType="LineChart"
                        data={dataMyLine}
                        options={optionsMyLine}
                        width={"100%"}
                        height={"500px"}
                    />
                    <br/>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"500px"}
                    />
                    <br/>
                    <Card>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="500px"
                            data={dataBar}
                            options={optionsBar}
                        />
                    </Card>
                </Card>
                <br/>
            </Card.Body>
        </Card>
    );
}

export default class Welcome extends Component{

    render(){
        return(
            <Col>
                <Carousel>
                    <Carousel.Item interval={50000}>
                        <div className='text-lg-center container-fluid p-5 backColor2 text-white'>
                            <h1 className="display-2">Welcome to Charts.io</h1>
                            <p className="lead">Create your own charts, taking control of your own money!</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <div className='text-lg-center container-fluid p-5 backColor2 text-white'>
                            <h1 className="display-2">Make amazing charts </h1>
                            <p className="lead">Store information that You think are important</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <div className='text-lg-center container-fluid p-5 backColor2 text-white'>
                            <h1 className="display-2">Save charts as CSV files! </h1>
                            <p className="lead">You can save your charts and send them as csv file</p>
                        </div>
                    </Carousel.Item>
                </Carousel>
                <br/>
                {ControlledCarousel()}
            </Col>
        );
    }
 }