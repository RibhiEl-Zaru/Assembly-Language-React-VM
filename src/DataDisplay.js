import React from "react";
import RegisterDisplay from "./DataDisplayContainer/RegisterDisplay.js"
import MemoryDisplay from "./DataDisplayContainer/MemoryDisplay.js"

import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

export default class DataDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      opRegs : this.props.opRegs,
      utilRegs : this.props.utilRegs,

    }
  }
  render(){
    console.log(this.state.opRegs);
    return(
      <div>
      <row>

      <h3> Registers </h3>

      </row>
        <RegisterDisplay utilRegs = {this.state.utilRegs} opRegs = {this.state.opRegs} />
        <MemoryDisplay/>
      </div>
    )
  }
}
