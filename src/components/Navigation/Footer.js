import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends React.Component{

    render(){

        let fullYear = new Date().getFullYear();
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>
                           {fullYear-1} - {fullYear}, All Rights Reserved by Jakub Przybysz
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }

}


export default Footer;