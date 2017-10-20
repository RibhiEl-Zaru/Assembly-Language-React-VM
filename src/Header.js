import React from "react";
import { Navbar} from "react-bootstrap";


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

      <Navbar >
            <Navbar.Brand>
              CS101 Honors Web App
            </Navbar.Brand>
      </Navbar>


    )
  }
}
