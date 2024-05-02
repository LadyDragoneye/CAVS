// Filename - pages/FAQ.js
 
import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import "./faqStyle.css"
<link href="styles.css" rel="stylesheet"></link>


const FAQ = () => {
    return (
        <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div style={{ backgroundColor : "secondary"}} class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h2 class="display-1 text-center">Frequently Asked Questions</h2>
                    <div class="text-center p-2">
                        <p>
                            Have another question?
                            <br/>
                            <a class ="btn btn-primary btn-lg mt-4" href="contact" role = "button">Contact Us</a>
                        </p>
                    </div>
                </div>
            </div>
            <div id="accordion">
                <Accordion>
                <div class="card">
                    <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I get started?</Accordion.Header>
                        <Accordion.Body> Getting started is easy! All you have to do is register your account to gain access to all features including the calendar.</Accordion.Body>
                        </Accordion.Item>
                    </h5>
                    </div>
    
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Is there customer support</Accordion.Header>
                        <Accordion.Body>  Yes, we have customer support. If you have any questions or concerns notify us via the "Contact us" tab.</Accordion.Body>
                    </Accordion.Item>
                    </h5>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>What are the features available with CAVS?</Accordion.Header>
                        <Accordion.Body>  You will have access to the calandar to add events and the voice memo system.</Accordion.Body>
                    </Accordion.Item>
                    </h5>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingFour">
                    <h5 class="mb-0">
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How do I get a role?</Accordion.Header>
                        <Accordion.Body>You will be assigned a role by your admin.</Accordion.Body>
                    </Accordion.Item>
            
                    </h5>
                    </div>
                </div>
                </Accordion>
                </div>   
                       
        </div>

        
    );
};
 
export default FAQ;