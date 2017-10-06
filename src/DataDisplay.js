import React from "react";
import RegisterDisplay from "./DataDisplayContainer/RegisterDisplay.js"
import MemoryDisplay from "./DataDisplayContainer/MemoryDisplay.js"
import Center from 'react-center';

import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

export default class DataDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      opRegs : this.props.opRegs,
      utilRegs : this.props.utilRegs,
      memoryOps : this.props.memoryOps

    }
  }
  render(){

    return(
      <div>

      <div>
      <Center>
        <h3> Registers </h3>
      </Center>
      </div>
      <div>
        <RegisterDisplay utilRegs = {this.state.utilRegs} memoryOps = {this.state.memoryOps} opRegs = {this.state.opRegs} />
      </div>
      <center>
        <h3> Memory Display </h3> 
      </center>
      <div>
            <MemoryDisplay
                memoryOps = {this.state.memoryOps}
            />
      </div>

      </div>
    )
  }
}
