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
      <row>
      <h3>


        <Label>{this.state.instruction}</Label>
        <Label>{this.state.address}</Label>
        <Label>{this.state.value}</Label>
      </h3>

      </row>
      </div>
    )
  }
}
