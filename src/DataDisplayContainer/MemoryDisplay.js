import React from "react";
import RegisterDisplay from "./RegisterDisplay.js"
import Center from 'react-center';
import DataRow from "./DataRow.js"

import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

export default class MemoryDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      memoryOps : this.props.memoryOps

    }
  }
  render(){
    return(
      <div>
      <div>
        <Grid>
          {this.state.memoryOps.map((memOp, index) => (
            <div>
            
            <DataRow
              instruction = {memOp.instruction}
              address = {memOp.address}
              value = {memOp.value}
            />
            </div>
          ))}
        </Grid>
      </div>
      </div>
    )
  }
}
