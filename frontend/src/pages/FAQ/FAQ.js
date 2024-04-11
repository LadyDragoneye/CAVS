// Filename - pages/FAQ.js
 
import React from "react";
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
                <div class="card">
                    <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        How do I get started?
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        Getting started is easy! All you have to do is register your account to gain access to all features including the calandar.
                    </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Is there customer support?
                        </button>
                    </h5>
                    </div>
                    <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        Yes, we have customer support. If you have any questions or concerns notify us via the "Contact us" tab.
                    </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        What are the features available with CAVS?
                        </button>
                    </h5>
                    </div>
                    <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        You will have access to the calandar to add events and the voice memo system.
                    </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingFour">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        How do I get a role?
                        </button>
                    </h5>
                    </div>
                    <div id="collapseFour" class="collapse show" aria-labelledby="headingFour" data-parent="#accordion">
                    <div class="card-body">
                        You will be assigned a role by your admin.
                    </div>
                    </div>
                </div>
                </div>          
        </div>

        
    );
};
 
export default FAQ;