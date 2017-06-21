import React from "react";
import { render } from "react-dom";
import './alert.css';

class Alert extends React.Component{
  
  render()
  {
    let showAmount = this.props.showAmount === true ? this.props.amount : '';
    return(
      <div className={'maxQuantityAlert alert ' + this.props.type}>
        <h3><i className="fa fa-icon fa-exclamation"></i><span>{this.props.message + ` ` + showAmount}</span></h3>
      </div>
    )
  }
}

export { Alert as default };