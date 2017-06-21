import React from "react";

class CheckboxOrRadioGroup extends React.Component{
  constructor(props)
  {
    super(props);
    this.state ={checked: false}

    this.controlFunc = this.controlFunc.bind(this);
  }

  componentDidMount()
  {
    this.setState({checked: this.props.checked})
  }

  controlFunc(e)
  {
    const state = this.state.checked;
    this.setState({ checked: !state });
    this.props.controlFunc(e)
  }

  render()
  {
    return(
      <div className="form-check">
        <label className="form-check-label">
          <i className={this.props.icon_name}></i> 
          <span>{this.props.title}</span>
          <input
            className="form-check-input"
            name={this.props.setName}
            onChange={this.controlFunc}
            checked={this.state.checked}
            value={this.props.permission_key}
            type={this.props.type} />
        </label>
      </div>
    )
  }

}

export { CheckboxOrRadioGroup as default };