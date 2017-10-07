import React from "react";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";


export default class Header extends React.Component {

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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            CS101 Honors Web App
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}
