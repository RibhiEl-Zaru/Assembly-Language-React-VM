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

    }
  }
  render(){
    return(
      <div>
      <Row>
      <Center>
        <h3> Registers </h3>
      </Center>
      </Row>
      <Row>
        <RegisterDisplay utilRegs = {this.state.utilRegs} opRegs = {this.state.opRegs} />
      </Row>
      <p>
      </p>
      <Row>
        <Center>
            <MemoryDisplay/>
        </Center>
      </Row>
      </div>
    )
  }
}
