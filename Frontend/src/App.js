import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ImageUpload from "./Components/ImageUpload";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/upload" component={ImageUpload} />
          </div>
        </Router>
      </div>
    );
  }
}
 export default App;