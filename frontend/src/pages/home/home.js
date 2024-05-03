// Filename - pages/home.js

import React from "react";
import "./home.css";

<link href="styles.css" rel="stylesheet"></link>

const Home = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div style={{ backgroundColor : "#D9E5F0"}} class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h2 class="display-1 text-center">Welcome to CAVS, the Court Attendance Verification System</h2>
                    <div class="text-center">
                        <p>
                            <a class ="btn btn-primary btn-lg" href="FAQ" role = "button">Learn More</a>
                        </p>
                    </div>
                </div>
            </div>


            <div class="container">
                <div class ="row">
                    <div class="container">
                        <div class="col-md-4">
                            <h2>About CAVS</h2>
                        <p>The purpose of the Court Attendance Verification Software (CAVS) is to allow legal professionals and law enforcement to better coordinate and help ensure compliance.
The website's main objective is to allow court dates to be added to a calendar, viewable by law enforcement and legal professionals. From there, law enforcement confirms their attendance at said court date.</p>
                        </div>
                        <div class="col-md-4">
                            <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                        </div>
                        <div class="col-md-4">
                            <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                        </div>
                    </div>    
                </div>
            </div>
        </div>

    );
};
 
export default Home;