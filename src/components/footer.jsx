import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram,faLinkedin,faFacebook} from '@fortawesome/free-brands-svg-icons';
import { Row,Col } from "react-bootstrap";
function Footer(){
    return (
       <div className="container-class">
           <Row>
               <Col className="footer-content">
               <div>
               <a href="https://instagram.com/the_cineast_?utm_medium=copy_link" target="_blank"><FontAwesomeIcon icon={faInstagram} className="brand-icon" /></a>
               <a href="https://www.linkedin.com/in/naveen-vashistha-23a36b166/" target="_blank"><FontAwesomeIcon icon={faLinkedin} className="brand-icon" /></a>
               <a href="https://www.facebook.com/naveen.vashistha.39" target="_blank"><FontAwesomeIcon icon={faFacebook} className="brand-icon" /></a>
               </div>
               <div className="name-contact">
               <p className="no-margin-bottom">Created by Naveen Vashistha</p>
               <p className="no-margin-bottom">+91-8929575158 | naveenvashistha2000@gmail.com</p>
               </div>
               <div className="disclaimer">
               </div>
               </Col>
           </Row>
       </div>
    );
}

export default Footer;