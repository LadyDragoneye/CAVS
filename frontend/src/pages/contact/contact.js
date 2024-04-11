// Filename - pages/contact.js
 
import React from "react";

<link href="styles.css" rel="stylesheet"></link>

const Contact = () => {
    return (
        <div class="container mt-5 pt-5">
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <div class="container p-5 mt-5">
                <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="well well-sm">
                    <form class="form-horizontal" action="" method="post">
                    <fieldset>
                        <legend class="text-center">Contact us</legend>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="name">Name</label>
                        <div class="col-md-9">
                            <input id="name" name="name" type="text" placeholder="Your name" class="form-control"></input>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="email">Your E-mail</label>
                        <div class="col-md-9">
                            <input id="email" name="email" type="text" placeholder="Your email" class="form-control"></input>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="message">Your message</label>
                        <div class="col-md-9">
                            <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <div class="col-md-12 text-right">
                            <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                        </div>
                        </div>
                    </fieldset>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};
 
export default Contact;