import React from "react";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";


export default class DataRow extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      instruction : this.props.instruction,
      address : this.props.address,
      value : this.props.value,

    }

  }

  render(){
    return(
      <div>

      <h4>
        <label className = "instruction">
          {this.state.instruction}  &nbsp;  {this.state.address} &nbsp;  {this.state.value}
        </label>


      </h4>

      </div>
    )
  }
}
