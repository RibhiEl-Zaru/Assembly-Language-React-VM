import React from "react";
import { FieldGroup, FormGroup, FormControl, ControlLabel, HelpBlock, Center, Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import styles from '../App.css';

const badInput = "Only commas and numbers can be input to DataSegment"
const goodInput = "Example input is : 34, 43, 72 "

export default class Register extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      //dataArray : this.props.dataArray,
      value: "",
      feedback: goodInput,
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    return 'success';

  }


  handleChange(e) {
    let str = e.target.value;
    var isValid = /^[0-9, ]*$/.test(str);
    console.log(isValid);

    if(isValid){
      let newStr = str.replace(/\s+/g,"");
      let numbers = newStr.replace(/(\r\n|\n|\r|)/gm,"");
      let data = numbers.split(",")

      for (var i = 0; i < data.length; i++){
          this.props.updateDataArray(i*4, data[i]);

      }

      console.log(this.props.dataArray);
      this.setState({
                      value: str,
                      feedback: goodInput
                      });

    }
    else{
      this.setState({
                    value: str,
                    feedback: badInput
                    });
    }

  }

  render(){

  //        console.log(this.props.dataArray);
    return(
    <FormGroup
      controlId="formBasicText"

    >
      <center>
        <ControlLabel> Data Segment </ControlLabel>
      </center>
      <FormControl
        type="text"
        value={this.state.value}
        placeholder="Enter numbers separated by commas"
        onChange={this.handleChange.bind(this)}
      />
      <FormControl.Feedback />
      <center>
        <HelpBlock>{this.state.feedback}</HelpBlock>
      </center>
    </FormGroup>


    )
  }
}
