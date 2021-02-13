import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import CheckouButton from './stripeButton';


class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return [
                        <li key={2}><a href="/auth/google">Login With Google</a></li>,
                        <li key={3}><a href="/auth/facebook">Login With Facebook</a></li>
                ];
            default:
                return [
                    <li key={0}><CheckouButton/></li>,
                    <li key={1}><a href="/api/logout">Logout</a></li>
                ];                    
                
        }
    }
    render() { 
        return ( 
            <nav>
                <div className="nav-wrapper">
                    <Link to={(this.props.auth)? "/surveys": "/"} className="brand-logo">Thr33</Link>
                    <ul id="nav-mobile" className="right">
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