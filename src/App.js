//import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
//import axios from 'axios';
import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavigationBar from './components/Navigation/NavigationBar';
import Welcome from './components/Contact/Welcome';
import ChartsList from './components/Results/ChartsList';
import Footer from './components/Navigation/Footer';
import NewCharts from './idk/NewCharts';
import Results from './components/Results/Results';
import Contact from './components/Contact/Contact';
import Incomes from "./components/Results/Incomes";
import Outcomes from "./components/Results/Outcomes";
import NewIncomes from "./components/NewCharts/NewIncomes";
import NewOutcomes from "./components/NewCharts/NewOutcomes";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import CustomChart from "./components/CustomCharts/CustomChart";

function App() {

  const marginTop = {
    marginTop:"25px"
  };

  return (
    <Router>
      <NavigationBar/>

      <Container>
        <Row>
          <Col lg ={12} style = {marginTop}>

            <Routes>
              <Route path="/" element={<Welcome/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/charts" element={<ChartsList/>}/>
              <Route path="/charts" element={<ChartsList/>}/>
              <Route path="/results" element={<Results/>}/>
              <Route path="/incomes" element={<Incomes/>}/>
              <Route path="/outcomes" element={<Outcomes/>}/>
              <Route path="/new" element={<NewCharts/>}/>
              <Route path="/new/incomes" element={<NewIncomes/>}/>
              <Route path="/new/outcomes" element={<NewOutcomes/>}/>
              <Route path="/edit/incomes/:id" element={<NewIncomes/>}/>
              <Route path="/edit/outcomes/:id" element={<NewOutcomes/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/logout"} element={<Login/>}/>
              <Route path={"/custom"} element={<CustomChart/>}/>
            </Routes>

          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>

  );
}

export default App;
