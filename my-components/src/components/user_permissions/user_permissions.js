import React from "react";
import CheckboxOrRadioGroup from "./checkbox_or_radio";
import './user_permissions.css';

class UserPermissions extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      allow_punchout: false,
      allow_user_management: false,
      can_request_quote: false,
      can_see_prices: false
    }

    this.handleAcceptance = this.handleAcceptance.bind(this);
  }

  componentWillMount() {
    this.props.user_permissions.allow_punchout ? this.setState({allow_punchout: this.props.user_permissions.allow_punchout}) : null
    this.props.user_permissions.allow_user_management ? this.setState({allow_user_management: this.props.user_permissions.allow_user_management}) : null
    this.props.user_permissions.can_request_quote ? this.setState({can_request_quote: this.props.user_permissions.can_request_quote}) : null
    this.props.user_permissions.can_see_prices ? this.setState({can_see_prices: this.props.user_permissions.can_see_prices}) : null
  }

  handleAcceptance(e)
  {
    
    // let user = {
    //   id:this.props.user_id,
    //   permission: e.target.value,
    //   value: e.target.checked
    // };
    // axios({
    //   url: ``,
    //   method: 'POST',
    //   headers: 
    //   {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data:{
    //     user:{
    //       id:this.props.user_id,
    //       permission: e.target.value,
    //       value: e.target.checked
    //     }
    //   }
    // }).then(response => {

    // })
    // .catch(response => console.log(response));
  }

  render()
  {
    return(
      <div>
        <CheckboxOrRadioGroup
          title={'Order Online'}
          setName={'allow_punchout'}
          type={'checkbox'}
          icon_name={'fa fa-mouse-pointer'}
          checked={this.state.allow_punchout}
          controlFunc={this.handleAcceptance}
          permission_key={'allow_punchout'} />

        <CheckboxOrRadioGroup
          title={'See Prices'}
          setName={'can_see_prices'}
          type={'checkbox'}
          icon_name={'fa fa-gbp'}
          checked={this.state.can_see_prices}
          controlFunc={this.handleAcceptance}
          permission_key={'can_see_prices'} />
        
        <CheckboxOrRadioGroup
          title={'Request Quotes'}
          setName={'can_request_quote'}
          type={'checkbox'}
          icon_name={'fa fa-tag'}
          checked={this.state.can_request_quote}
          controlFunc={this.handleAcceptance}
          permission_key={'can_request_quote'} />
        
        <CheckboxOrRadioGroup
          title={'Add New Users'}
          setName={'allow_user_management'}
          type={'checkbox'}
          icon_name={'fa fa-plus'}
          checked={this.state.allow_user_management}
          controlFunc={this.handleAcceptance}
          permission_key={'allow_user_management'} />

      </div>
    )
  }
}

export { UserPermissions as default };