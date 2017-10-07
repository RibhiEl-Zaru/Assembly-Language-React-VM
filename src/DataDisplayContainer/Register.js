import React from "react";
import { Center, Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import styles from '../App.css';
export default class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name : this.props.name,
      value : this.props.value,
      width : this.props.width,
    }

  }
  // Use CSS to get the width going.

  render(){
    return(
       <h4>
       <label className = "register">
          {this.props.name} :  {this.props.value}
         </label>
       </h4>


    )
  }
}
