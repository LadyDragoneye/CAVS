import React from "react";
import Button from 'react-bootstrap/Button';

const Home = () => {
   
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div class="jumbotron jumbotron-fluid position-relative start-50">
                <div class="container position-relative start-50">
                    <h1 class="text-center">
                    <h1 class="display-1">Court Attendance Verification Software</h1>
                    </h1>
                </div>
            </div>
            <div class="text-center">
           <Button href='/Cal' size="lg ">Calendar</Button>
           </div>
        </div>
    );
};
 
export default Home;