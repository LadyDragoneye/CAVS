// Filename - pages/home.js

import React from "react";
import "./home.css";
import policePic from './policePic2.jpg';
import lawPic from './lawpic2.jpg';

<link href="home.css" rel="stylesheet"></link>

const Home = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div style={{ backgroundColor : "#D9E5F0"}} class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h2 class="display-1 text-center" id="CAVStitle">Welcome to CAVS, the Court Attendance Verification System</h2>
                    <div class="text-center">
                        <p>
                            <a class ="btn btn-primary btn-lg" href="FAQ" role = "button" id="learnButton">Learn More</a>
                        </p>
                    </div>
                </div>
            </div>


            <div class="container">
                <div class ="row">
                    <div class="container">
                        <div class="col-md-4" id="lawPic">
                            <img src={lawPic} alt="LawPicture"></img>
                        </div>
                        <div class="col-md-4" id="aboutTitle">
                            <h2 class="text-center">About CAVS</h2>
                        <p class="text-center" id="info">The purpose of the Court Attendance Verification Software (CAVS) is to allow legal professionals and law enforcement to better coordinate and help ensure compliance. The website's main objective is to allow court dates to be added to a calendar, viewable by law enforcement and legal professionals. From there, law enforcement confirms their attendance at said court date.</p>
                        </div>
                        <div class="col-md-4" id="copPic">
                            <img src={policePic} alt="PolicePicture"></img>
                        </div>
                    
                    </div>
                </div>
            </div>

        </div>
    );
};
 
export default Home;