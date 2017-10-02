import React from "react";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

import Register from "./Register.js"

export default class RegisterCol extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      registers : this.props.registers,
    }
  }

  setRegisters(registers){
    this.setState({registers});
  }

  render(){
    return(
      <div>
        <Grid>
        {this.state.registers.map((register, index) => (
          //<Col lg ={6} md = {6} sm = {2} xs = {1}>

          <Register key = {index} name = {register.name} value = {register.value} n/>
          //</Col>
        ))}
        </Grid>
      </div>
    )
  }
}
