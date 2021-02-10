import React, { Component } from 'react'
import {connect} from 'react-redux';
class DashBoard extends Component {
    state = {  }
    render() { 
        return ( <div>
            <h1>Hello DashBoard</h1>
        </div> );
    }
}
 
export default connect()(DashBoard);