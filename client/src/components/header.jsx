import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Link, NavLink} from 'react-router-dom';
class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }
    render() { 
        return ( 
            <nav>
                <div className="nav-wrapper">
                <Link to="#" className="brand-logo">Thr33</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
             );
    }
}
 
function mapStateToProps({auth}){
    return  {auth};
}

export default connect(mapStateToProps)(Header);