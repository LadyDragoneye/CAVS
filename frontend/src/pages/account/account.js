// Filename - pages/account.js
import React from "react";
import "./account.css";
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>

const Account = () => {
    return (
    <html class="html-info">
    <body class="body-info">
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row justify-content-center"> 
                <div class="col-md-9 border-right mr-md-6 mx-auto text-center">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-center mb-3">
                            <h4>Profile</h4>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6 text-md-left"><label class="labels">Username:</label></div>
                            <div class="col-md-6"><span>*User</span></div>
                        </div>
                        <div className="row mt-3">
                            <div class="col-md-6"><label class="labels">First Name:</label></div>
                            <div class="col-md-6"><span>*First Name</span></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">Last Name:</label></div>
                            <div class="col-md-6"><span>*Last Name</span></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">Role:</label></div>
                            <div class="col-md-6"><span>*Role</span></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">Email:</label></div>
                            <div class="col-md-6"><span>*Email</span></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary mb-3">Change Password</button>
                </div>
            </div>
        </div>
    </body>
    </html>
    );
};

export default Account;