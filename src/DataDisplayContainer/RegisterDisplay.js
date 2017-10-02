import React from "react";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

import Register from "./Register.js"
import RegisterCol from "./RegisterCol.js"

export default class RegisterDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      utilRegs : this.props.utilRegs,
      opRegs : this.props.opRegs,
    }
  }

  setRegisters(registers){
    this.setState({registers});
  }

  render(){
    return(
      <div>

      <Col lg = {6} md = {6} sm = {3}>
        <RegisterCol registers = {this.state.utilRegs} />
      </Col>

      <Col lg = {6} md = {6} sm = {3}>
        <RegisterCol registers = {this.state.opRegs} />
      </Col>

      </div>
    )
  }
}
