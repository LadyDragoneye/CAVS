// Filename - pages/account.js
 
import React from "react";
import "./account.css";

const Account = () => {
    return (
    <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"></div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label></div>
                    <div class="col-md-12"><label class="labels">Postcode</label></div>
                    <div class="col-md-12"><label class="labels">State</label></div>
                    <div class="col-md-12"><label class="labels">Area</label></div>
                    <div class="col-md-12"><label class="labels">Email ID</label></div>
                    <div class="col-md-12"><label class="labels">Education</label></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label></div>
                    <div class="col-md-6"><label class="labels">State/Region</label></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    );
};
 
export default Account;