import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import main from './components/Main';
import signIn from './components/SignIn';

// simple list
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={main}/>
                    <Route exact path="/main" component={main}/>
                    <Route exact path="/signin" component={signIn}/>
                </div>
            </Router>
        );
    }
}

export default App;