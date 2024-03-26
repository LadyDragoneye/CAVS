import React from "react";
<link href="styles.css" rel="stylesheet"></link>

const Home = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div style={{ backgroundColor : "secondary"}} class="jumbotron jumbotron-fluid position-relative start-50">
                <div class="container position-relative start-50">
                    <h2 class="display-1 text-center">Welcome to CAVS, the Court Attendance Verification System</h2>
                    <div class="text-center">
                        <p>
                            <a class ="btn btn-primary btn-lg" href="about" role = "button">Learn More</a>
                        </p>
                    </div>
                </div>
            </div>


            <div class="jumbotron">
                <h2 class='font-weight-bold'>About CAVS</h2>
                <h4 class='text-center'>The purpose of the Court Attendance Verification Software (CAVS) is to allow legal professionals and law enforcement to better coordinate and help ensure compliance.</h4>
                <h4 class='text-center'>The website's main objective is to allow court dates to be added to a calendar, viewable by law enforcement and legal professionals. From there, law enforcement confirms their attendance at said court date.</h4>
            </div>
            <hr/>

        </div>
    );
};
 
export default Home;