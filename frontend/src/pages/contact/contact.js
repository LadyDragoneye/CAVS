// Filename - pages/contact.js
 
import React, {useState} from "react";
import emailjs from '@emailjs/browser';
import "./conStyles.css";
<link href="conStyles.css" rel="stylesheet"></link>
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceID = 'service_ccxsj7p';
        const tempID = 'template_t08wmwh';
        const PublicKey = 'wxoa6bUKS-f-mKfbO';
        
        const templateParams ={
            from_name: name,
            from_email: email,
            to_name: 'CAVS Team',
            message: message,
        };

        emailjs.send(serviceID, tempID, templateParams, PublicKey)
            .then((response) => {
                console.log('Email sent sucessfully!', response);
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Error sending email: ', error);
            });
    }
    return (
        
        <div class="container mt-5 pt-5">
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <div class="container p-5 mt-5" id="contactForm">
                <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="well well-sm" id="hey">
                    <form class="form-horizontal" onSubmit={handleSubmit} className="emailForm">
                    <fieldset>
                        <legend class="text-center" id="contactTitle">Contact us</legend>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="name" id="nameBox">Name</label>
                        <div class="col-md-9">
                            <input id="name" name="name" type="text" placeholder="Name" class="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="email" id="email">E-mail</label>
                        <div class="col-md-9">
                            <input id="email" name="email" type="text" placeholder="E-mail" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <label class="col-md-3 control-label" for="message" id="message">Message</label>
                        <div class="col-md-9">
                            <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        </div>
                
                        <div class="form-group">
                        <div class="col-md-12 text-right">
                           <button type="submit" id="submitButton">Send</button>
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