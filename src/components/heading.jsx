import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Heading(){
    return (
        <Navbar className="heading fixed-top" expand="lg">
           <Container>
                <Navbar.Brand href="#home" style={{color: "white"}}>Sub-Easy</Navbar.Brand>
           </Container>
        </Navbar>
    );
}

export default Heading;