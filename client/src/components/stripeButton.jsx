import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

import StripeCheckout from 'react-stripe-checkout'
class CheckouButton extends Component {
    state = {  }
    render() { 
        return ( 
         <StripeCheckout 
         name="Thr33"
         description="$5 for 5 email credits"
         amount={500}
         token={token => this.props.handleToken(token)}
         stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
         >
             <button className="btn btn-primary s-m">ADD CREDITS</button>
         </StripeCheckout> 
        );
    }
}
 
export default connect(null, actions)(CheckouButton);