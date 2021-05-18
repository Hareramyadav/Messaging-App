import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';

import Login from './components/login';
import MyNetwork from './components/myNetwork';
import Messaging from './components/messaging';


class App extends Component{
    render(){
        return(
            <div>
                <Router>
                    <h1 className="app">Messaging App</h1>
                    <nav className="nav-bar">
                        <ul className="nav-link">
                            <li className="nav-item">
                                <Link to="/mynetwork" className="navbar-link">My Network</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/messaging" className="navbar-link">Messaging</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Login} />
                    <Route path="/mynetwork" component={MyNetwork} />
                    <Route path="/messaging" component={Messaging}/>
                </Router>
            </div>
        )
    }
}

export default App;