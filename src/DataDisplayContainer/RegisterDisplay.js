import React from "react";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import Center from 'react-center';

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
        <Grid>
          <Col lg = {2} md = {2} sm = {2}>
            <RegisterCol registers = {this.state.utilRegs} />
          </Col>

          <Col lg = {2} md = {2} sm = {2}>
            <RegisterCol registers = {this.state.opRegs} />
          </Col>
        </Grid>
      </div>
    )
  }
}
