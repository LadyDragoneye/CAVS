import React, { Component } from 'react';  // Import React and Component from 'react' module
import axios from 'axios';  // Import axios for making HTTP requests

class App extends Component {  // Define a new class component named App
  state = {  // Initialize component state
    details: [],  // Initialize 'details' state as an empty array
    error: null  // Initialize 'error' state as null
  };

  componentDidMount() {  // Lifecycle method called after the component is mounted
    axios.get('http://localhost:8000/')  // Make an HTTP GET request to the specified URL
      .then(response => {  // Handle successful response
        this.setState({ details: response.data });  // Update 'details' state with data from the response
      })
      .catch(error => {  // Handle error
        this.setState({ error: error.message });  // Update 'error' state with error message
      });
  }

  render() {  // Render method to render component UI
    const { details, error } = this.state;  // Destructure 'details' and 'error' from component state

    return (  // JSX markup for component UI
      <div>
        <header>Data Generated from Django</header>  {/* Header */}
        <hr />  
        {error ? (  // Conditionally render error message if 'error' state is not null
          <div>Error: {error}</div>
        ) : (  // Render list of details if no error
          <ul>
            {details.map((item, index) => (  // Map through 'details' array and render each item
              <li key={index}>  {/* Use index as key for each list item */}
                <strong>Employee:</strong> {item.employee}, <strong>Department:</strong> {item.department}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;  // Export App component as default export
