// Filename - pages/account.js
 
import React from "react";
import "./account.css";

const Account = () => {
    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row justify-content-center"> {/* Center the content horizontally */}
                <div className="col-md-9 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Name</label></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Mobile Number</label></div>
                            <div className="col-md-12"><label className="labels">Address Line 1</label></div>
                            <div className="col-md-12"><label className="labels">Address Line 2</label></div>
                            <div className="col-md-12"><label className="labels">Postcode</label></div>
                            <div className="col-md-12"><label className="labels">State</label></div>
                            <div className="col-md-12"><label className="labels">Area</label></div>
                            <div className="col-md-12"><label className="labels">Email ID</label></div>
                            <div className="col-md-12"><label className="labels">Education</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;