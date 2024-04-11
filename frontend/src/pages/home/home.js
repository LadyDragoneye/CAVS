import React from "react";
import './home.css';
import Button from 'react-bootstrap/Button';

const Home = () => {
   
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div style={{ backgroundColor : "transparent"}} class="jumbotron jumbotron-fluid position-relative start-50">
                <div class="container position-relative start-50">
                    <p class="display-1 text-center">Welcome to this CAVS, the Court Attendance Verification Software</p>
                </div>
            </div>
            <div class="text-center">
           <Button href='/Cal' size="lg ">Calendar</Button>
           </div>
        </div>
    );
};
 
export default Home;